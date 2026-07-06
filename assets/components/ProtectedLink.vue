<template>
  <div class="protected-link">
    <NuxtLink @click.prevent="openModal">
      {{ label }}
    </NuxtLink>
  </div>
  <SecurityModal
      v-if="showModal"
      :question="currentQuestion"
      @close="showModal = false"
      @success="grantAccess"
  />
</template>

<script setup>
import {ref} from "vue";
import questions from "../../content/securityQuestions.json"
import SecurityModal from "~/assets/components/SecurityModal.vue";

const props = defineProps({
  label: String,
  to: String
});

const authenticated = computed(() => document.cookie
    .split("; ")
    .find(row => row.startsWith("dabad-access="))
    ?.split("=")[1]);
const showModal = ref(false);
const currentQuestion = ref(null);

function openModal() {
  if (!authenticated.value) {
    currentQuestion.value = questions[Math.floor(Math.random() * questions.length)];
    showModal.value = true;
  } else {
    closeModalAndReroute();
  }
}

function closeModalAndReroute() {
  showModal.value = false;
  useRouter().push(props.to);
}

function grantAccess() {
  document.cookie = "dabad-access=true; max-age=3600; path=/";
  closeModalAndReroute();
}

</script>

<style scoped>
.protected-link {
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 10%;
}
</style>
