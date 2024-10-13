<template>
  <h1>Database</h1>
  <div class="search-area">
    <input
        id="search_input"
        type="text"
        placeholder="search..."
        @input="updateSearchQuery"
    />
    <button class="random-button" @click="getRandomMedia">random</button>
  </div>
  <div class="advanced-search-area">
    <div class="open-advanced-search" v-if="!showAdvancedSearch" @click="toggleAdvancedSearch">
      <img src="/assets/icons/arrow_right.png" alt="open advanced search"/>
      <p>Advanced Search</p>
    </div>
    <div class="advanced-search" v-if="showAdvancedSearch">
      <img src="/assets/icons/arrow_down.png" alt="advanced search" @click="toggleAdvancedSearch"/>
      <div class="advanced-search-filters">
        <p><b>Advanced Search</b></p>
        <select>genre</select>
        <select>type</select>
        <input/>runtime_from
        <input/>runtime_to
        <input type="checkbox">watched
        <input type="checkbox">franchise
        <input/>cast and crew
      </div>
    </div>
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

definePageMeta({
  layout: 'database'
});

const data = database;
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

const showAdvancedSearch = ref(false);
const toggleAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value;
}

const getRandomMedia = () => {
  const randIndex = Math.floor(Math.random() * data.length);
  const randomID = data[randIndex].ID;
  navigateTo('database/' + randomID);
}


</script>

<style lang="scss" scoped>

.search-area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 5px 20px 0;
  height: 40px;

  input {
    width: 300px;
    font-family: "Courier New", serif;
    font-size: 16px;
  }

  .random-button {
    width: 100px;
    height: inherit;
    margin: 0 5px;
    align-self: center;
    font-family: inherit;
    font-size: inherit;
    color: grey;
    background: white;
    cursor: pointer;
    border: 3px solid dimgrey;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;

    &:hover {
      background: gray;
      color: white;
    }
  }
}

.advanced-search-area {
  margin: 10px 0;

  img {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  .open-advanced-search {
    display: flex;
    flex-direction: row;
  }

  .advanced-search {
    display: flex;
    flex-direction: column;

    .advanced-search-filters {
      margin: 5px;
    }
  }

}

.database {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>
