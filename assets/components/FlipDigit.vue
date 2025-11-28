<template>
  <div class="flip-digit" :class="{'flip': flipping}">
    <div class="top">{{next}}</div>
    <div class="top-overlay">{{current}}</div>
    <div class="bottom">{{current}}</div>
    <div class="bottom-overlay">{{next}}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  value: {type: Number, required: true},
  label: {type: String, required: false},
});

const current = ref(props.value); // mit 0er auf zweistellig auffüllen
const next = ref(props.value - 1); // mit 0er auf zweistellig auffüllen
const flipping = ref(false);

watch(
    () => props.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        current.value = oldVal
        next.value = newVal
        flipping.value = true
        setTimeout(() => {
          flipping.value = false
        }, 500);
      }
    }
);

</script>


<style lang="scss" scoped>
.flip-digit {

  --countdown-font-size: 50px;
  --countdown-padding: 10px;
  --countdown-border-radius: 5px;

  color: black;
  font-family: "Courier New", Helvetica, sans-serif;
  font-size: var(--countdown-font-size);

  position: relative;

  display: flex;
  flex-direction: column;
}

.top,
.bottom,
.top-overlay,
.bottom-overlay {
  padding: var(--countdown-padding);
  height: calc((var(--countdown-font-size) - 2 * var(--countdown-padding))/ 2);
  line-height: 1;
  overflow: hidden;
  border-radius: var(--countdown-border-radius);
}

.top {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}

.top,
.top-overlay {
  background-color: #dddddd;
}

.bottom,
.bottom-overlay {
  background-color: #aaaaaa;

  display: flex;
  align-items: flex-end;
}

.top-overlay {
  position: absolute;
  background-color: #dddddd;

  transform-origin: bottom;
  animation: top-flip 0.5s ease-out;
}

.bottom-overlay {
  position: absolute;
  bottom: 0;
  background-color: #aaaaaa;

  transform-origin: top;
  transform: rotateX(90deg);
  animation: bottom-flip 0.5s ease-in;
  animation-delay: 1s;
}

@keyframes top-flip {
  100% {
    transform: rotateX(90deg);
  }
}

@keyframes bottom-flip {
  100% {
    transform: rotateX(0deg);
  }
}
</style>
