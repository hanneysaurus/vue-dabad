<template>
  <h1>DVD and BluRay Administrator</h1>
  <h2>{{filmcount}} films, {{seriescount}} seasons </h2>
  <div class="search-area">
    <input
        v-model="title"
        type="text"
        placeholder="search..."
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
        <select name="genres" v-model="genre">
          <option></option>
          <option v-for="g in genres" :value="g" :key="g">{{ g }}</option>
        </select>
        <p>Medium: </p>
        <select v-model="medium">
          <option></option>
          <option>DVD</option>
          <option>BluRay</option>
        </select>
        <p>Type: </p>
        <select v-model="type">
          <option></option>
          <option>Film</option>
          <option>Series</option>
        </select>
        <div class="runtime-search">
          <p>Runtime: </p>
          <input type="number" maxlength="3" oninput="this.value=this.value.slice(0,3)" placeholder="from" v-model="runtimeFrom"/>
          <input type="number" maxlength="3" oninput="this.value=this.value.slice(0,3)" placeholder="to" v-model="runtimeTo"/>
        </div>
        <div class="additional-info">
          <p>Has additional Info</p>
          <input type="checkbox" v-model="additionalInfo">
        </div>
        <div class="watched">
          <p>Show unwatched only</p>
          <input type="checkbox" v-model="unwatched">
        </div>
        <div class="franchise">
          <p>Show franchise only</p>
          <input type="checkbox" v-model="franchise">
        </div>
        <div class="cast-crew">
          <p>Cast & Crew</p>
          <input v-model="castAndCrew" type="text" placeholder="cast and crew"/>
        </div>
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
import {getGenres} from "assets/utils.js";

definePageMeta({
  layout: 'database'
});

const data = database;
const genres = computed(() => getGenres());
const filmcount = computed(() => {
  return data.filter(media => {
    return media.Type === "Film";
  }).length;
});
const seriescount = computed(() => {
  return data.filter(media => {
    return media.Type === "Series";
  }).length;
});

const title = ref("");
const genre = ref("");
const medium = ref("");
const type = ref("");
const additionalInfo = ref(false);
const unwatched = ref(false);
const franchise = ref(false);
const runtimeFrom = ref();
const runtimeTo = ref();
const castAndCrew = ref("");

const filteredData = computed(() => {
  return data.filter(media => {
    const mediaTitle = media.Title.toString().toLowerCase();
    const mediaGenre = media.Genre;
    const mediaMedium = media.Medium;
    const mediaType = media.Type;
    const mediaAdditionalInfo = media.AdditionalInfo !== '';
    const mediaUnwatched = media.Watched === "NO";
    const mediaFranchise = media.Franchise === "YES";
    const mediaRuntime = Number(media.Runtime);
    const mediaDirector = media.Director.toString().toLowerCase();
    const mediaWriter = media.Writer.toString().toLowerCase();
    const mediaMusic = media.Music.toString().toLowerCase();
    const mediaCinematography = media.Cinematography.toString().toLowerCase();
    const mediaCostume = media.CostumeDesign.toString().toLowerCase();
    const mediaCast = media.Cast.toString().toLowerCase();

    return (
        mediaTitle.includes(title.value.toString().toLowerCase()) &&
        (!medium.value || mediaMedium === medium.value) &&
        (!type.value || mediaType === type.value) &&
        (!genre.value || mediaGenre.includes(genre.value)) &&
        (!unwatched.value || mediaUnwatched) &&
        (!additionalInfo.value || mediaAdditionalInfo) &&
        (!franchise.value || mediaFranchise) &&
        (!runtimeFrom.value || mediaRuntime >= Number(runtimeFrom.value)) &&
        (!runtimeTo.value || mediaRuntime <= Number(runtimeTo.value)) &&

        ((!castAndCrew.value || mediaDirector.includes(castAndCrew.value.toString().toLowerCase())) ||
            (!castAndCrew.value || mediaWriter.includes(castAndCrew.value.toString().toLowerCase())) ||
            (!castAndCrew.value || mediaMusic.includes(castAndCrew.value.toString().toLowerCase())) ||
            (!castAndCrew.value || mediaCinematography.includes(castAndCrew.value.toString().toLowerCase())) ||
            (!castAndCrew.value || mediaCostume.includes(castAndCrew.value.toString().toLowerCase())) ||
            (!castAndCrew.value || mediaCast.includes(castAndCrew.value.toString().toLowerCase())))
    );
  });
});

const showAdvancedSearch = ref(false);
const toggleAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value;
}

const getRandomMedia = () => {
  const randIndex = Math.floor(Math.random() * data.length);
  const randomID = data[randIndex].ID;
  navigateTo('dabad/' + randomID);
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
      flex-wrap: wrap;
      gap: 20px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

</style>
