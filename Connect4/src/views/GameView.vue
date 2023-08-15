<template>
  <div class="Game-Field-Wrapper">
    <div class="Top-Menu">
      <router-link :to="{name:'Start'}" class="btn">menu</router-link>
      <div class="top-logo">
        <img src="@/assets/svg/pink_token.svg" alt="">
        <img src="@/assets/svg/yellow_token.svg" alt="">
        <img src="@/assets/svg/yellow_token.svg" alt="">
        <img src="@/assets/svg/pink_token.svg" alt="">
      </div>
      <div class="btn" @click="resetGameField">restart</div>
    </div>
    <div class="game">
      <div class="player">
        <img src="@/assets/svg/pink_smiley_token.svg" alt="">
        <div>Player 1</div>
        <div class="score">{{player_1_wins}}</div>
      </div>

      <TheGameField/>

      <div class="player">
        <img src="@/assets/svg/yellow_smiley_token.svg" alt="">
        <div>{{ cpu_active?'COM' :'Player 2' }}</div>
        <div class="score">{{player_2_wins}}</div>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">

import TheGameField from "@/components/TheGameField.vue";
import {useGameStatsStore} from "@/stores/gameStats";
import {storeToRefs} from "pinia";
import {computed, onMounted} from "vue";

const store = useGameStatsStore()
const {player_1_wins, player_2_wins, cpu_active, resetGameField, reset} = storeToRefs(store)


onMounted(() =>{
  reset
})



</script>

<style scoped>
@import "@/assets/StartView.css";
@import "@/assets/GameView.css";

</style>