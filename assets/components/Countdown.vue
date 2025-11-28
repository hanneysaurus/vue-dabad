<template>
<div class="countdown">
<h2>Countdown to the Oscars on {{ targetDateTime.toLocaleString() }}</h2>
<span class="tokens" v-if="remaining.total > 0">
  <!--FlipDigit :value="remaining.days"/>
  <FlipDigit :value="remaining.hours"/>
  <FlipDigit :value="remaining.minutes"/-->
  <!--FlipDigit :value="remaining.seconds"/-->
  <FlipDigit2 :value="remaining.seconds"/>
  <Test :target-date="targetDateTime"/>
</span>
<p v-else>🎉 Time's up!</p>
</div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import FlipDigit2 from "assets/components/FlipDigit2.vue";
import Test from "assets/components/Test.vue";

const targetDateTime = new Date('2026-03-17T00:00:00');

const now = ref(new Date());

let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const remaining = computed(() => {
  const diff = targetDateTime - now.value;
  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  }
})
</script>

<style scoped>
.tokens {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
}
</style>