<template>
  <div class="about-page">
    <h1 class="title">About</h1>
    <div class="content">
      <img src="/about.jpg" alt="A woman with curly hair is seen from the back on the left side. In the background there is a cloudy beach with a green hill in the back." />
      <div>
        <p>Hi! I'm Hannah. &#128075;</p>
        <p>I like reviewing films and series that inspire, stun, enrage or - like any good piece of art - make me think. Sometimes they are also just fun and I need more people to see them. Have a look and see if you find anything in the world of Broadway and Hollywood that catches your eyes in the <NuxtLink to="/reviews">Reviews</NuxtLink> section.</p>
        <p>I have come to love writing. I like to use it to process feelings, thoughts and experiences. My first screenplay is completed and waiting for production so maybe some more stories may come along on here as well. Have a read over on <NuxtLink to="/stories">Stories</NuxtLink> to see what my weird brain is up to these days.</p>
        <p>You can find a selection of my projects in the <NuxtLink to="/work">Works & Projects</NuxtLink> section.</p>
        <p>I like to host pubquizzes, whether it is online or in person. Find some sample questions in the <NuxtLink to="/quizzes">Quizzes</NuxtLink> section and if you have the need for a host, hit me up!</p>
        <p><br/><br/><strong>Contact:</strong> <a href="mailto:hanneysaurus@hotmail.com">hanneysaurus@hotmail.com</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 0 20px;

  .content {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 40px;

    img {
      margin-top: 20px;
      width: 100%;
    }

    p {
      font-size: 20px;
      margin: 20px 0;
    }
  }
}
</style>
