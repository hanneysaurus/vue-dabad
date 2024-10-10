<template>
  <h1>Database</h1>
  <div class="search">
    <input
        type="text"
        @input="updateSearchQuery"
    />
  </div>
  <div class="database">
    <div v-for="(d, index) in filteredData" :key="index">
      <MediaCard :media="d" :index="index"/>
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

const searchQuery = ref();
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return data;
  }
  return data.filter(media => {
    const searchable = media.Title.toString().toLowerCase();
    const query = searchQuery.value.toString().toLowerCase();
    return searchable.includes(query);
  });
});

const updateSearchQuery = (event) => {
  searchQuery.value = event.target.value;
};

</script>

<style lang="scss" scoped>

.database {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>
