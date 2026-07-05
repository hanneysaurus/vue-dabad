<template>
  <div>
    <header>
      <nav>
        <NuxtLink class="back" :to="to">back</NuxtLink>
      </nav>
    </header>

    <div>
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const to = computed(() => route.name === "dabad" ? "/" : "/dabad");
</script>

<style scoped>
.back {
  position: relative;
  font-size: 30px;
  font-weight: bolder;
  text-decoration: none;
  vertical-align: center;
  background: #b0042f;
  padding: 0 5px;
}
</style>
