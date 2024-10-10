<template>
  <h1>Database</h1>
  <div class="database">
    <div v-for="(d, index) in data" :key="index">
      <MediaCard :media="d" :index="index" />
    </div>
  </div>
</template>

<script setup>
import database from '/content/database.json';
import MediaCard from "assets/components/MediaCard.vue";

const data = database;

definePageMeta({
  layout: 'database'
});

</script>

<style lang="scss" scoped>

.database {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>
