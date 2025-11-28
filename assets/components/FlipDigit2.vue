<template>
  <div class="flip-digit">
    <div class="display">
      <div class="display-top">{{ value }}</div>
      <div class="display-bottom">{{ value }}</div>
      <div class="overlay" :class="{'flip': flipping}">
        <div class="overlay-top">{{ value }}</div>
        <div class="overlay-bottom">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    value: {type: Number, required: true},
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
          }, 1000);
        }
      }
  );
</script>

<style scoped lang="scss">
.flip-digit {
  display: flex;
  gap: 10px;
  font-family: sans-serif;

  text-align: center;
  font-size: 30px;

  .display {
    position: relative;
    height: 100%;
    width: 50px; // has to be same width as width
  }

  .display-top,
  .display-bottom {
    overflow: hidden;
    text-align: center;
    width: 100%;
    height: 50%;
    position: relative;
  }

  .display-top {
    background: lightyellow;
    color: black;
    line-height: 1.5; // has to be same lineheight as overlay-top
  }

  .display-bottom {
    background: cornflowerblue;
    color: white;
    bottom: 0;
    line-height: 0; // has to be same lineheight as overlay-bottom
  }

  .overlay {
    position: absolute;
    top: 0;
    height: 100%;
    width: 50px;  // has to be same width as display
    perspective: 400px; // can be tweaked

    &.flip {
      .overlay-top {
        animation: flip-top 0.5s linear;
      }
      .overlay-bottom {
        animation: flip-bottom 0.5s linear;
        animation-delay: 0.5s;
      }
    }
  }

  .overlay-top,
  .overlay-bottom {
    position: absolute;
    overflow: hidden;
    text-align: center;
    width: 100%;
    height: 50%;
  }

  .overlay-top {
    top: 0;
    line-height: 1.5; // has to be same lineheight as display-top
    background: lightyellow;
    color: black;
    transform-origin: bottom;
  }

  .overlay-bottom {
    bottom: 0;
    line-height: 0; // has to be same lineheight as display-bottom
    background: cornflowerblue;
    color: white;
    transform-origin: top;
  }

  @keyframes flip-top {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(-90deg);
    }
  }

  @keyframes flip-bottom {
    0% {
      transform: rotateX(90deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }

}

</style>