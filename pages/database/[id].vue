<template>
  <div class="detail-page">

    <div class="details">
      <div class="overview">
        <p class="title">{{ media.Title }}</p>
        <p class="type-year">{{ media.Type }}, {{ media.Year }}</p>
        <div class="medium-runtime">
          <img class="medium" v-if="mediums.includes('DVD')" src="/assets/icons/dvd.png" alt="available on DVD"/>
          <img class="medium" v-if="mediums.includes('BluRay')" src="/assets/icons/bluray.png"
               alt="available on BluRay"/>
          <p class="runtime">{{ media.Runtime }} minutes</p>
          <div class="watched">
            <p>watched:</p>
            <input type="checkbox" :checked="media.Watched === 'YES'" > <!--disabled-->
          </div>
          <div class="additional-info" v-if="media.AdditionalInfo">
            <img class="additional-info-button" src="/assets/icons/info.png" alt="additional Info: {{media.AdditionalInfo}}"/>
            <p class="additional-info-text">{{media.AdditionalInfo}}</p>
          </div>
        </div>
        <p class="director"><b>directed by</b> {{ media.Director }}</p>
        <p class="writer"><u>written by</u> {{ media.Writer }}</p>
        <div class="summary">
          <p><i>{{ media.Summary }}</i></p>
        </div>
        <div class="genres">
          <GenreToken v-for="g in genres" :genre="g"/>
        </div>
        <div class="cast-crew">
          <div class="music" v-if="media.Music">
            <img src="/assets/icons/music.png" alt="music by"/>
            <p>{{ media.Music }}</p>
          </div>
          <div class="cinematography" v-if="media.Cinematography">
            <img src="/assets/icons/camera.png" alt="cinematography by"/>
            <p>{{ media.Cinematography }}</p>
          </div>
          <div class="costumedesign" v-if="media.CostumeDesign">
            <img src="/assets/icons/costume.png" alt="costumedesign by"/>
            <p>{{ media.CostumeDesign }}</p>
          </div>
          <div class="cast" v-if="media.Cast">
            <p> <b>Cast</b> <br/> {{ media.Cast }}</p>
          </div>
        </div>
      </div>
      <div class="poster-container">
        <img class="poster" :alt="`${getImageID(media.Title)}`" :src="`/images/${getImageID(media.Title)}`"/>
      </div>
    </div>

    <div class="franchise-info">
      <div v-if="prequels || sequels" class="franchise-links">
        <div v-if="prequels" class="prequels">
          <p>follows</p>
          <div v-for="p in prequels">
            <MediaListItem :media="p"/>
          </div>
        </div>
        <div v-if="sequels" class="sequels">
          <p>succeeded by</p>
          <div v-for="s in sequels">
            <MediaListItem :media="s"/>
          </div>
        </div>
      </div>
      <div v-if="media.Franchise === 'YES'" class="franchise-completion">
        <p>This {{ media.Type.toString().toLowerCase() }} is part of a <b>franchise</b>.</p>
        <p v-if="media.FranchiseComplete === 'YES'">This franchise is <u style="color: #03c03c">complete</u> in
          Hanney's library.&#128522;</p>
        <p v-if="media.FranchiseComplete === 'NO'">This franchise is <u style="color: orange">incomplete</u> in Hanney's
          library.&#128551;<br/> It
          is missing:</p>
        <ul v-if="missingMedia" style="margin: 0">
          <li v-for="m in missingMedia"><i>{{ m }}</i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import database from '/content/database.json';
import GenreToken from 'assets/components/GenreToken.vue';
import MediaListItem from "assets/components/MediaListItem.vue";
import {getImageID} from "assets/utils.js";

const {id} = useRoute().params;
const uri = database.findIndex((d) => d.ID === id);
const media = database[uri];

const prequels = media.Prequels ? getFranchiseInfo(media.Prequels.split(', ')) : null;
const sequels = media.Sequels ? getFranchiseInfo(media.Sequels.split(', ')) : null;
const mediums = media.Medium.split(', ');
const genres = media.Genre ? media.Genre.split(', ') : null;
const missingMedia = media.MissingParts ? media.MissingParts.split(', ') : null;

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
  display: flex;
  flex-direction: column;
  background: white;
  outline: solid darkblue 10px;
  outline-offset: 10px;
  padding: 40px;

  .details {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 40px 0;

    .overview {
      width: 600px;

      .title {
        font-weight: bold;
        font-size: 30px;
        margin: 0 0 5px 0;
      }

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

        .watched {
          display: flex;
          flex-direction: row;
          margin: 0 0 0 50px;
          align-items: center;

          [type="checkbox"] {
            width: 20px;
            height: 20px;
          }

          pointer-events: none;
        }

        .additional-info {
          display: flex;
          flex-direction: row;
          transition: linear 0.5s;

          .additional-info-button {
            width: 20px;
            height: 20px;
            align-self: center;
            margin: 0 0 0 25px;
            cursor: help;
            opacity: 0.7;

            &:hover {
              scale: 1.1;
              opacity: 1;
              ~ .additional-info-text {
                display: inline-block;
              }
            }
          }

          .additional-info-text {
            display: none;
            color: dodgerblue;
            font-size: 12px;
            margin-left: 10px;
            align-content: center;
          }

        }
      }

      .summary {
        height: 150px;
        padding: 5px;
        outline: black solid 2px;
        outline-offset: 5px;
        margin: 0 0 20px 0;

        overflow-y: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;

        p {
          margin: 0;
        }
      }

      .genres {
        display: flex;
        flex-direction: row;
        margin: 0 0 20px 0;
      }

      .cast-crew {
        display: flex;
        flex-direction: column;

        img {
          width: 20px;
          height: 20px;
          align-self: center;
          margin: 0 5px 0 0;
        }

        p {
          margin: 10px 0;
        }

        .music {
          display: flex;
          flex-direction: row;
        }

        .cinematography {
          display: flex;
          flex-direction: row;
        }

        .costumedesign {
          display: flex;
          flex-direction: row;
        }

        .cast {
          background: lightgrey;
          margin: 10px 20px 0 20px;
          border-radius: 10px;
          text-align: justify;

          p {
            margin: 15px;
          }
        }

      }

    }

    .poster-container {
      width: 400px;
      height: auto;
      overflow: hidden;
      align-content: center;

      .poster {
        width: inherit;
        overflow: hidden;
        outline: solid white 2px;
        outline-offset: -10px;
      }
    }
  }

  .franchise-info {
    display: flex;
    flex-direction: column;
    align-self: center;

    .franchise-completion {
      margin: 20px 0 0 5px;
      p {
        margin: 0;
      }
    }

    .franchise-links {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .prequels,
      .sequels {
        margin: 0 20px 0 0;

        p {
          font-size: 18px;
          font-weight: bold;
          margin: 0 0 0 5px;
        }
      }
    }
  }
}
</style>
