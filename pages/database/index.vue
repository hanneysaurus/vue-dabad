<template>
  <h1>Database</h1>
  <div class="database">
    <div v-for="(d, index) in data" :key="index">
      <!--MediaCard :data="d"/-->
      <NuxtLink :to="`/database/${d.ID}`" @mouseenter="checkOverflow(index)">
        <div class="media-card">
          <div class="preview-container">
            <img :alt="`${getImageID(d.Title)}`" :src="`/images/${getImageID(d.Title)}`" class="preview"/>
          </div>
          <div :ref="el => setTextContainerRefs(el, index)" class="text-container" :class="{overflow: isOverflowing}">
            <p class="title">{{ d.Title }}</p>
            <p class="year">{{ d.Year }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import database from '/content/database.json';
import {getImageID} from "assets/utils.js";

const data = database;

/*function getImageID(title) {
  let title_cleaned = title.toString().replaceAll('&', 'and');
  title_cleaned = title_cleaned.replaceAll('ö', 'o');
  title_cleaned = title_cleaned.replaceAll('ä', 'a');
  title_cleaned = title_cleaned.replaceAll('ü', 'u');
  title_cleaned = title_cleaned.replace(/[^a-zA-Z0-9 ]/g, '');
  title_cleaned = title_cleaned.replaceAll('__', '_');
  const image_id = title_cleaned.toLowerCase().replace(/\s+/g, '_');
  return image_id + ".jpg";
}*/

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

definePageMeta({
  layout: 'database'
});

</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
  color: black;
}

.database {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
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
      transition: transform var(--title-animation-time);
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
