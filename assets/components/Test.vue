<template>
  <div class="countdown">
    <div
        v-for="(unit, label) in timeLeft"
        :key="label"
        class="time-section"
    >
      <div class="time-group">
        <div
            class="time-segment"
            v-for="(digit, i) in formatDigits(unit)"
            :key="label + i"
        >
          <div class="segment-display">
            <div class="segment-display__top">{{ digit }}</div>
            <div class="segment-display__bottom">{{ digit }}</div>

            <div
                class="segment-overlay"
                :class="{ flip: flipFlags[label][i] }"
                @animationend="flipFlags[label][i] = false"
            >
              <div class="segment-overlay__top">{{ digit }}</div>
              <div class="segment-overlay__bottom">
                {{ nextDigits[label][i] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
// TODO: https://github.com/coskuncay/vue3-flip-countdown/blob/master/src/Countdown.vue

// === Props ===
const props = defineProps({
  targetDate: {
    type: Date,
    required: true,
  },
});

// === State ===
const timeLeft = ref({
  Hours: 0,
  Minutes: 0,
  Seconds: 0,
});

const nextDigits = ref({
  Hours: ["0", "0"],
  Minutes: ["0", "0"],
  Seconds: ["0", "0"],
});

const flipFlags = ref({
  Hours: [false, false],
  Minutes: [false, false],
  Seconds: [false, false],
});

// === Utils ===
function formatDigits(num) {
  const s = String(num).padStart(2, "0");
  return [s[0], s[1]];
}

function calculateTimeLeft() {
  const now = new Date();
  const diff = Math.max(0, props.targetDate - now);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { Hours: hours, Minutes: minutes, Seconds: seconds };
}

// === Timer Logic ===
let timer;

function updateCountdown() {
  const newTime = calculateTimeLeft();

  Object.keys(newTime).forEach((key) => {
    const oldVal = formatDigits(timeLeft.value[key]);
    const newVal = formatDigits(newTime[key]);

    // detect change per digit
    newVal.forEach((d, i) => {
      if (d !== oldVal[i]) {
        flipFlags.value[key][i] = true;
        nextDigits.value[key][i] = d;
      }
    });
  });

  timeLeft.value = newTime;
}

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<style scoped>
/* === Core Layout === */
.countdown {
  display: flex;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  color: #fff;
  font-family: "Courier New", monospace;
}
.time-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-group {
  display: flex;
  gap: 0.3rem;
}
.time-segment {
  position: relative;
}
.segment-display {
  position: relative;
  perspective: 400px;
}
.segment-display__top,
.segment-display__bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 1.5rem;
  background: #222;
  font-size: 2rem;
  border-radius: 0.2rem;
  overflow: hidden;
}
.segment-display__top {
  border-bottom: 2px solid #000;
}
.segment-display__bottom {
  border-top: 2px solid #000;
}

/* === Flip Overlay === */
.segment-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform-style: preserve-3d;
  perspective: 400px;
  transform-origin: bottom;
}
.segment-overlay__top,
.segment-overlay__bottom {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  background: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.segment-overlay__top {
  top: 0;
  border-bottom: 2px solid #000;
}
.segment-overlay__bottom {
  bottom: 0;
  border-top: 2px solid #000;
}

/* === Animation === */
.segment-overlay.flip .segment-overlay__top {
  animation: flipTop 0.4s ease-in forwards;
}
.segment-overlay.flip .segment-overlay__bottom {
  animation: flipBottom 0.4s ease-out 0.2s forwards;
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}
@keyframes flipBottom {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

body {
  background: #111;
}
</style>
