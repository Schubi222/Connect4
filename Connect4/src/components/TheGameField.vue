<template>
  <div class="Game-Field">
    <GameToken :token="current_player" id="marker" ref="marker"/>
    <div class="Game-Field__column" v-for="(column, index) in game_field" :key="index" :id="'col'+index">
      <div class="Game-Field__column-tile" v-for="(tile, index) in column" :key="index" >
        <GameToken :token="tile" v-if="tile"/>
      </div>
    </div>
    <div class="time">
      <span>{{current_player}}'s turn</span>
      <span class="time_time">10s</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import GameToken from "@/components/GameToken.vue";

import {storeToRefs} from "pinia";
import {computed} from "vue";
import {useGameStatsStore} from "@/stores/gameStats";

const store = useGameStatsStore()
const {game_field, current_player} = storeToRefs(store)

const currentPlayer = computed(() =>{
  return current_player.value === 1 ? 'pink' : 'yellow'
})
const marker = ref(null)

onMounted(() =>{
  document.getElementById('col0').append(document.getElementById('marker'))
})

</script>

<style scoped>
  @import "@/assets/TheGameField.css";
</style>