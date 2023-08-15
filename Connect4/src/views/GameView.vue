<template>
  <div class="Game-Field-Wrapper">
    <div class="Top-Menu">
      <div class="btn">menu</div>
      <div class="top-logo">
        <img src="@/assets/svg/pink_token.svg" alt="">
        <img src="@/assets/svg/yellow_token.svg" alt="">
        <img src="@/assets/svg/yellow_token.svg" alt="">
        <img src="@/assets/svg/pink_token.svg" alt="">
      </div>
      <div class="btn">restart</div>
    </div>
    <TheGameField/>
  </div>

</template>

<script setup lang="ts">

import TheGameField from "@/components/TheGameField.vue";
</script>

<style scoped>
@import "@/assets/StartView.css";
@import "@/assets/GameView.css";

</style>