<template>
  <div class="Home">
    <div class="top-logo">
      <img src="@/assets/svg/pink_token.svg" alt="">
      <img src="@/assets/svg/yellow_token.svg" alt="">
      <img src="@/assets/svg/yellow_token.svg" alt="">
      <img src="@/assets/svg/pink_token.svg" alt="">
    </div>
    <router-link class="pink_btn" :to="{name:'Play'}">play vs cpu</router-link>
    <router-link class="yellow_btn" :to="{name:'Play'}">play vs player</router-link>
    <router-link class="white_btn" :to="{name:'Rules'}">game rules</router-link>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import "@/assets/StartView.css";
</style>