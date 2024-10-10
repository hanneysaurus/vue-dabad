<template class="container">
  <div class="genretoken" :style="tokenStyle">
    <p>{{ genre }}</p>
  </div>
</template>

<script>
export default {
  name: "GenreToken",
  props: {
    genre: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      colorMapping: [
        {genre: "Action", style: ['mediumblue', 'white']},
        {genre: "Adventure", style: ['orange', 'black']},
        {genre: "Animation", style: ['orangered', 'black']},
        {genre: "Biography", style: ['fuchsia', 'black']},
        {genre: "Comedy", style: ['cyan', 'black']},
        {genre: "Coming-of-Age", style: ['pink', 'black']},
        {genre: "Crime", style: ['olive', 'white']},
        {genre: "Documentary", style: ['maroon', 'white']},
        {genre: "Drama", style: ['gold', 'black']},
        {genre: "Epic", style: ['lavender', 'black']},
        {genre: "Fantasy", style: ['darkmagenta', 'white']},
        {genre: "History", style: ['gainsboro', 'black']},
        {genre: "Horror", style: ['black', 'white']},
        {genre: "Musical", style: ['darkviolet', 'white']},
        {genre: "Mystery", style: ['teal', 'white']},
        {genre: "Romance", style: ['deeppink', 'black']},
        {genre: "SciFi", style: ['lime', 'black']},
        {genre: "Seasonal", style: ['green', 'white']},
        {genre: "Sitcom", style: ['palegreen', 'black']},
        {genre: "Sport", style: ['lightskyblue', 'black']},
        {genre: "Thriller", style: ['navy', 'white']},
        {genre: "War", style: ['crimson', 'black']},
        {genre: "Western", style: ['cornsilk', 'black']},
      ]
    }
  },
  computed: {
    tokenStyle() {
      const found = this.colorMapping.find(item => item.genre === this.genre);
      const backgroundColor = found ? found.style[0] : 'lightgrey';
      const color = found ? found.style[1] : 'grey';
      return {
        backgroundColor,
        color,
      };
    }
  }
};

</script>

<style lang="scss" scoped>
.genretoken {
  border-radius: 10px;
  outline: black 1px solid;
  font-size: 15px;
  height: 20px;
  width: 125px;

  display: flex;
  justify-content: center;
  margin: 0 5px;

  p {
    margin: auto;
  }

}

</style>
