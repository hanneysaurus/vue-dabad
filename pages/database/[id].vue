<template>
  <div class="detail-page">

    <div class="overview">
      <p class="title">{{ media.Title }}</p>
      <p class="type-year">{{ media.Type }}, {{ media.Year }}</p>
      <div class="medium-runtime">
        <img class="medium" v-if="mediums.includes('DVD')" src="/assets/icons/dvd.png" alt="available on DVD"/>
        <img class="medium" v-if="mediums.includes('BluRay')" src="/assets/icons/bluray.png" alt="available on BluRay"/>
        <p class="runtime">{{ media.Length }} minutes</p>
      </div>
    </div>

    <div class="cast-crew">
      <p class="director">directed by {{ media.Director }}</p>
      <p class="writer">written by {{ media.Director }}</p>
      <div class="genres">
        <GenreToken v-for="g in genres" :genre="g"/>
      </div>
      <p class="summary">{{ media.Summary }}</p>
      <p class="cast">{{ media.Cast }}</p>
      <p class="cinematographer">{{ media.Cinematography }}</p>
      <p class="music">{{ media.Music }}</p>
      <p class="costumedesign">{{ media.CostumeDesign }}</p>
    </div>

    <div class="franchise-links">
      <div v-if="prequels">
        <h2>follows</h2>
        <div v-for="p in prequels">
          <MediaListItem :media="p" />
        </div>
      </div>
      <div v-if="sequels">
        <h2>supersceeded by</h2>
        <div v-for="s in sequels">
          <MediaListItem :media="s" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import database from '/content/database.json';
import GenreToken from 'assets/components/GenreToken.vue';
import MediaListItem from "assets/components/MediaListItem.vue";

const {id} = useRoute().params;
const uri = database.findIndex((d) => d.ID === id);
const media = database[uri];

const prequels = media.Prequels ? getFranchiseInfo(media.Prequels.split(', ')) : null;
const sequels = media.Sequels ? getFranchiseInfo(media.Sequels.split(', ')) : null;
const mediums = media.Medium.split(', ');
const genres = media.Genre ? media.Genre.split(', ') : null;

function getFranchiseInfo(franchise) {
  const franchiseInfo = [];

  franchise.forEach(function (f) {
    const index = database.findIndex((d) => d.Title === f);
    let media = {ID: 'notFound'};
    if (index !== -1) {
      media = database[index];
    }
    franchiseInfo.push(media);
  });

  return franchiseInfo;
}

definePageMeta({
  layout: 'database'
});

</script>

<style lang="scss" scoped>

.detail-page {
  background: white;
  outline: solid darkblue 10px;
  outline-offset: 10px;
  padding: 20px;
}

.title {
  font-weight: bold;
  font-size: 30px;
  margin: 0 0 5px 0;
}

/*
    "Seen": "YES",
    "Franchise": "NO",
    "Prequels": "",
    "Sequels": "",
    "Franchise Complete": "",
*/

.type-year {
  margin: 0 0 20px 0;
}

.medium-runtime {
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: 0 0 20px 0;

  .medium {
    width: 30px;
    height: 30px;
    align-self: center;
    margin: 0 10px 0 0;
  }
}

.genres {
  display: flex;
  flex-direction: row;
}

.franchise-links {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
