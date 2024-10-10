<template>
  <div>
    <header>
      <nav>
        <NuxtLink class="back" to="/database">back</NuxtLink>
      </nav>
    </header>

    <div>
      <slot/>
    </div>
  </div>
</template>


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
<script setup lang="ts">
</script>
