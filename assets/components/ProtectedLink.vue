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

const showModal = ref(false);
const currentQuestion = ref(null);

function openModal() {
  currentQuestion.value = questions[Math.floor(Math.random() * questions.length)];
  showModal.value = true;
}

function grantAccess() {
  showModal.value = false;
  useRouter().push(props.to);
}
</script>

<style scoped>
.protected-link {
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 10%;
}
</style>