<template>
  <div>
    <ConstructionWork/>
    <h1>What's Up</h1>
    <h2>Latest stories</h2>
    <h2>This is my week in a nutshell</h2>
    <p>{{whatsup.listening}}</p>
  </div>
</template>

<script setup>
import whatsup from '/content/whatsup.json';
import ConstructionWork from "~/assets/components/ConstructionWork.vue";
</script>