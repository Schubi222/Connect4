<template>
  <div class="Home">
    <div class="top-logo">
      <img src="@/assets/svg/pink_token.svg" alt="">
      <img src="@/assets/svg/yellow_token.svg" alt="">
      <img src="@/assets/svg/yellow_token.svg" alt="">
      <img src="@/assets/svg/pink_token.svg" alt="">
    </div>
    <div class="pink_btn" @click="playVSCPU">play vs cpu</div>
    <div class="yellow_btn" @click="playVSPlayer">play vs player</div>
    <router-link class="white_btn" :to="{name:'Rules'}">game rules</router-link>
  </div>
</template>

<script setup lang="ts">

import {useGameStatsStore} from "@/stores/gameStats";
import {storeToRefs} from "pinia";
import router from "@/router";

const store = useGameStatsStore()
const {cpu_active} = storeToRefs(store)

const playVSCPU = () =>{
  cpu_active.value = true
  router.push({name:'Play'})
}
const playVSPlayer = () =>{
  cpu_active.value = false
  router.push({name:'Play'})
}

</script>

<style scoped>
@import "@/assets/StartView.css";
</style>