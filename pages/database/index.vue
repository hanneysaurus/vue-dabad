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
      <div class="open-advanced-search">
        <img src="/assets/icons/arrow_down.png" alt="advanced search" @click="toggleAdvancedSearch"/>
        <p><b>Advanced Search</b></p>
      </div>
      <div class="advanced-search-filters">
        <p>Genre: </p>
        <select name="genres" id="genres">
          <option></option>
          <option v-for="g in getGenres()" :value="{g}">{{ g }}</option>
        </select>
        <p>Type: </p>
        <select>
          <option></option>
          <option>DVD</option>
          <option>BluRay</option>
        </select>
        <div class="runtime-search">
          <p>Runtime: </p>
          <input type="number" maxlength="3" oninput="this.value=this.value.slice(0,3)" placeholder="from"/>
          <input type="number" maxlength="3" oninput="this.value=this.value.slice(0,3)" placeholder="to"/>
        </div>
        <div class="watched">
          <p>Watched</p>
          <input type="checkbox">
        </div>
        <div class="franchise">
          <p>Franchise</p>
          <input type="checkbox">
        </div>
        <div class="cast-crew">
          <p>Cast & Crew</p>
          <input type="text" placeholder="cast and crew"/>
        </div>
      </div>
      <button class="search-button" @submit="updateSearchQuery">search</button>
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
import {getGenres} from "assets/utils.js";

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
  margin: 10px 10px 10px 0;
  background: #ffffffaa;

  img {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  p {
    margin: 0 0 0 5px;
  }

  .open-advanced-search {
    display: flex;
    flex-direction: row;
  }

  .advanced-search {
    display: flex;
    flex-direction: column;

    select {
      font-family: inherit;
    }

    input {
      font-family: inherit;
    }

    .search-button {
      font-family: inherit;
      align-self: end;
    }

    .advanced-search-filters {
      display: flex;
      flex-direction: row;
      margin: 10px 0 0 15px;

      .runtime-search {
        display: flex;
        flex-direction: row;

        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          -moz-appearance: textfield;
        }

      }

    }
  }

}

.database {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>
