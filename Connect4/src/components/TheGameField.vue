<template>
  <div class="Game-Field" >
    <GameToken :token="current_player" id="marker" ref="marker"/>
    <div class="Game-Field__column" v-for="(column, index) in game_field" :key="index" :id="'col'+index">
      <div class="Game-Field__column-tile" v-for="(tile, index) in column" :key="index" >
        <GameToken :token="tile" v-if="tile"/>
      </div>
    </div>
    <div class="time">
      <span>{{current_player}}'s turn</span>
      <span class="time_time">{{countDown}}s</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import GameToken from "@/components/GameToken.vue";

import {storeToRefs} from "pinia";
import {computed} from "vue";
import {useGameStatsStore} from "@/stores/gameStats";

const store = useGameStatsStore()
const {game_field, current_player, countDown} = storeToRefs(store)

const currentPlayer = computed(() =>{
  return current_player.value === 1 ? 'pink' : 'yellow'
})
const marker = ref(null)
const marker_pos = ref(0)

function move(l:boolean){
  if (!marker_pos.value && l){return}
  if (marker_pos.value === 6 && !l){return}
  marker_pos.value += l ? -1 : 1
  document.getElementById(`col${marker_pos.value}`).append(document.getElementById('marker'))
}

/**
 * @param column
 * @returns position - if negative column is full
 * */
function findLowestPosInColumn (column:Array<number>):number{
  let pos = 0
  while (!column[pos] && pos < column.length){
    pos++
  }
  return pos -1
}

function place(){
  const pos = findLowestPosInColumn(game_field.value[marker_pos.value])
  if (pos === -1){return}
  game_field.value[marker_pos.value][pos] = current_player.value
  store.nextPlayer()
  countDown.value = 30
}

function handleKeyDown(e){
  console.log(e.keyCode)
  switch (e.keyCode){

    case 37:
      move(true)
      break
    case 39:
      move(false)
      break;
    case 32:
      place()
      break;
  }
}

let interval = setInterval(() => {
  if(countDown.value === 0){
    store.nextPlayer()
    countDown.value = 30
  }
  countDown.value--;
}, 1000)


onMounted(() =>{
  document.getElementById('col0').append(document.getElementById('marker'))
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() =>{
  window.removeEventListener('keydown',handleKeyDown)
})

</script>

<style scoped>
  @import "@/assets/TheGameField.css";
</style>