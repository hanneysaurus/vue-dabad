<template>
  <header class="header">
    <div class="header-title">
      <span>&#127916;</span>
      <h1>Hanneysaurus</h1>
    </div>
    <nav class="navigation">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/stories">Stories</NuxtLink>
      <NuxtLink to="/reviews">Reviews</NuxtLink>
      <NuxtLink to="/quizzes">Quizzes</NuxtLink>
      <NuxtLink to="/work">Work</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <ProtectedLink to="/dabad" label="DABAD" />
    </nav>
  </header>

  <div class="slot">
    <slot/>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #780000;
  padding: 0 20px 0 10px;

  .header-title {
    display: flex;
    flex-direction: row;

    span {
      font-size: 50px;
    }
  }

  .navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: end;
  }
}

.slot {
  margin: 40px;
}
</style>
<script setup lang="ts">
import ProtectedLink from "~/assets/components/ProtectedLink.vue";
</script>