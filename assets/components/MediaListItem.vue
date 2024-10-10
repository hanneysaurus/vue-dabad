<template>
  <NuxtLink :to="`/database/${props.media.ID}`">
    <div class="medialistitem">
      <img :alt="`${props.media.Title}`" :src="`/images/${getImageID(props.media.Title)}`" class="preview"/>
      <p class="text">{{ props.media.Title }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
import {getImageID} from "assets/utils.js";

const props = defineProps({
      media: Object,
    }
)

</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}

.medialistitem {
  display: flex;
  flex-direction: row;
  margin: 5px;
  border-radius: 5px;
  outline: black solid 1px;
  overflow: hidden;
  width: 200px;
  height: 80px;

  &:hover {
    background: #ebab47;
    .text {
      color: white;
    }
  }

  .preview {
    width: 60px;
  }

  .text {
    margin: 0 5px;
    align-self: center;
  }
}
</style>
