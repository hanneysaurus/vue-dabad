<template>
    <NuxtLink :to="`/database/${media.ID}`">
      <div class="medialistitem">
        <img :alt="`${media.Title}`" :src="`/images/${getImageID(media.Title)}`" class="preview"/>
        <p class="text">{{ media.Title }}</p>
      </div>
    </NuxtLink>
</template>

<script>
import {getImageID} from "assets/utils.js";

export default {
  methods: {getImageID},
  props: {
    media: {
      type: Object,
      required: true,
    }
  }
}
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

  .preview {
    width: 60px;
  }

  .text {
    margin: 0 5px;
    align-self: center;
  }
}
</style>
