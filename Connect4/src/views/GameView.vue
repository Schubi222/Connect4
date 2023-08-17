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
      <div class="btn" @click="restart">restart</div>
    </div>
    <div class="game">
      <div class="player">
        <img src="@/assets/svg/pink_smiley_token.svg" alt="">
        <div>Player 1</div>
        <div class="score">{{player_1_wins}}</div>
      </div>
      <div class="The-Game-Field-Container">
        <TheGameField ref="game_field_ref"/>
        <div class="win_draw_popup" v-if="winner || winner === 0" >
          <div class="player_won" v-if="winner > 0">Player {{winner}}</div>
          <h2>{{winner === 0 ? 'DRAW' : "WON"}}</h2>
          <div class="play-btn" @click="play_again">Play Again</div>
        </div>
      </div>


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
import {computed, onMounted, ref} from "vue";

const store = useGameStatsStore()
const {player_1_wins, player_2_wins, cpu_active, winner, game_stop} = storeToRefs(store)

const game_field_ref = ref(null)

const restart = () =>{
  if (game_stop.value){return}
  store.resetGameField()
  game_field_ref.value.checkForCPUFirstMove()
}

const play_again = () =>{
  store.nextRound()
  game_field_ref.value.checkForCPUFirstMove()
}
onMounted(() =>{
  store.reset()
})



</script>

<style scoped>
@import "@/assets/StartView.css";
@import "@/assets/GameView.css";

</style>