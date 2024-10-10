<template>
  <h1>Database</h1>
  <div class="search-area">
    <input
        type="text"
        placeholder="search..."
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

.search-area {
  margin: 0 0 20px 0;

  input {
    width: 300px;
    height: 40px;
    font-family: "Courier New", serif;
    font-size: 16px;

  }
}

.database {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>
