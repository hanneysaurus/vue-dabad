<template>
  <header class="header">
    <div class="header-title">
      <span>&#128252;</span>
      <h1>DABAD</h1>
    </div>
    <nav class="navigation">
      <NuxtLink :to="to">back</NuxtLink>
    </nav>
  </header>

  <div class="slot">
    <slot/>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const to = computed(() => route.name === "dabad" ? "/" : "/dabad");
</script>

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
    gap: 20px;
  }
}

.slot {
  margin: 40px;
}
</style>
