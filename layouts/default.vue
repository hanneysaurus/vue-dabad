<template>
  <div>
    <header>
      <nav>
        <h1>Hanneysaurus</h1>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/database">Database</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <Countdown/>

    <div>
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
import Countdown from "assets/components/Countdown.vue";

const targetDateTime = new Date('2026-03-17T00:00:00');
</script>