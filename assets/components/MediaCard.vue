<template>
  <NuxtLink :to="`/database/${props.media.ID}`" @mouseenter="checkOverflow(props.index)">
    <div class="media-card">
      <div class="preview-container">
        <img :alt="`${getImageID(props.media.Title)}`" :src="`/images/${getImageID(props.media.Title)}`" class="preview"/>
      </div>
      <div :ref="el => setTextContainerRefs(el, index)" class="text-container" :class="{overflow: isOverflowing}">
        <p class="title">{{ props.media.Title }}</p>
        <p class="year">{{ props.media.Year }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import {getImageID} from "assets/utils";

const props = defineProps({
      media: Object,
      index: Number,
    }
);

const isOverflowing = ref(false);
const textContainerRefs = reactive({});

const setTextContainerRefs = (el, index) => {
  if (el) {
    textContainerRefs[index] = el;
  } else {
    delete textContainerRefs[index];
  }
};

const checkOverflow = (index) => {
  const textContainerRef = textContainerRefs[index];
  const {scrollWidth, clientWidth} = textContainerRef;
  isOverflowing.value = scrollWidth > clientWidth;
  const textWidth = scrollWidth - clientWidth;
  textContainerRef.style.setProperty('--title-length', textWidth + 'px');
  const animationTime = textWidth / 100;
  textContainerRef.style.setProperty('--title-animation-time', animationTime + 's');
};

</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
  color: black;
}

.media-card {
  --media-card-size: 220px;
  --media-card-padding: 15px;
  --title-length: 200px;
  --title-animation-time: 2.5s;
  background: white;
  height: calc(var(--media-card-size) * 1.25);
  width: var(--media-card-size);
  padding: var(--media-card-padding);

  &:hover {
    outline: solid #ebab47 10px;
    outline-offset: -16px;

    .preview-container {
      filter: brightness(1.3);
    }

    .overflow .title {
      transform: translateX(calc(var(--title-length) * -1));
      transition: transform var(--title-animation-time) ease-in;
    }
  }

  .preview-container {
    --preview-size: var(--media-card-size);
    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    overflow: hidden;
    align-self: center;

    .preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow: hidden;

    .title {
      margin: 5px 0 0 0;
      font-size: 18px;
      font-weight: bold;
      white-space: nowrap;
    }

    .year {
      margin: 5px 0 0 0;
      font-size: 14px;
    }
  }

}
</style>
