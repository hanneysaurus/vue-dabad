<template>
  <div class="overlay">
    <div class="security-modal">
      <h2>Certified Personnel Only</h2>
      <p>Access to DABAD is restricted to certified people only.</p>
      <p v-if="!error"> Please answer the following question correctly to continue.</p>
      <p class="question" v-if="!error">{{ question.question }}</p>
      <input
          v-if="!error"
          v-model="userAnswer"
          placeholder="Your answer"
          @keyup.enter="submit"
      />
      <p v-if="error" class="error">You don't seem to be authorised. Raise your weirdness-level.</p>
      <div class="buttons">
        <button v-if="!error" @click="submit">
          Let's go!
        </button>
        <button @click="$emit('close')">
          I give up.
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  question: Object
});

const emit = defineEmits([
  "success",
  "close"
]);

const userAnswer = ref("");
const error = ref(false);

function submit() {
  const answer = userAnswer.value.trim().toLowerCase();

  const isCorrect = props.question.answers.some(
      acceptedAnswer => acceptedAnswer.toLowerCase() === answer
  );

  if (isCorrect) {
    emit("success");
  } else {
    error.value = true;
  }
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.security-modal {
  width: 75%;
  padding: 20px;
  border-radius: 10px;

  background: #669BBC;
  color: #003049;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  .question {
    font-weight: bold;
  }

  input {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .error {
    font-weight: bold;
  }

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    button {
      font-size: 16px;
      background: #FDF0D5;
      color: #003049;
      border-radius: 5px;
    }
  }
}
</style>