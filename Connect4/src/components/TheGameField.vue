<template>
  <div class="Game-Field" >
    <GameToken :token="current_player" id="marker" ref="marker"/>
    <div
        class="Game-Field__column"
        v-for="(column, index) in game_field"
        :key="index"
        :id="'col'+index"
        @click="clicked_col"
    >
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

import {useGameStatsStore} from "@/stores/gameStats";

const store = useGameStatsStore()
const {game_field, current_player, countDown, cpu_active, winner, game_stop, player_1_wins, player_2_wins} = storeToRefs(store)

/*const currentPlayer = computed(() =>{
  return current_player.value === 1 ? 'pink' : 'yellow'
})*/
const marker = ref(null)
const marker_pos = ref(0)


const clicked_col = (e:any) =>{
  if (cpu_active.value && current_player.value === 2){return}
  const target = e.target.parentElement.id ? e.target.parentElement : e.target
  target.style.background = "lightblue"
  target.append(document.getElementById('marker'))
  marker_pos.value = Number(target.id.slice(-1))

  setTimeout(() =>{
    place()
  },200)

  setTimeout(()=>{
    target.style.background = "none"
  },200
  )
}



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

  if (checkEndGame(marker_pos.value, pos)){return;}
  store.nextPlayer()
  countDown.value = 30

  if (cpu_active.value && current_player.value === 2){setTimeout(computerMakesMove,1000)}
}

const checkForCPUFirstMove = () =>{
  if (cpu_active.value && current_player.value === 2){setTimeout(computerMakesMove,1000)}
}

function computerMakesMove(){
  let pos = -1
  let col = -1
  while(pos === -1){
    col = Math.floor(Math.random() * 7)
    pos = findLowestPosInColumn(game_field.value[col])
  }
  marker_pos.value = col
  document.getElementById(`col${marker_pos.value}`).append(document.getElementById('marker'))
  place()
}

function handleKeyDown(e:any){
  if (game_stop.value || (cpu_active.value && current_player.value === 2)){return}
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
    if (game_stop.value){return}
    store.nextPlayer()
    countDown.value = 30
  }
  countDown.value--;
}, 1000)

/**
 * @param col col of the placed stone
 * @param pos in the col
 * */
function checkEndGame(col:number, pos:number):boolean{
  if (checkWin(col, pos)){
    endGame(current_player.value)
    return true
  }
  if (checkDraw())
  {
    endGame(0)
    return true
  }
  return false
}
/**
 * @param col col of the placed stone
 * @param pos in the col
 * */
function checkWin(col:number, pos:number):boolean{
  let connected = 1
  const space_left = col > 3 ? 3 : col
  const space_right =  6-col > 3 ? 3 : 6-col
  const space_top = pos > 3 ? 3 : pos
  const space_bottom = 5-pos > 3 ? 3 : 5-pos

  for (let i = col-space_left; i < col; i++) {
    if (game_field.value[i][pos] !== current_player.value){
      connected = 1
      continue
    }
    connected++
    if (connected === 4) {return true}
  }

  for (let i = col+1; i <= col+space_right; i++) {
    if (game_field.value[i][pos] !== current_player.value){
      break
    }
    connected++
    if (connected === 4) {return true}
  }

  connected = 1
  for (let i = pos+1; i <= pos+space_bottom; i++) {
    if (game_field.value[col][i] !== current_player.value){
      break
    }
    connected++
    if (connected === 4) {return true}
  }

  connected = 1
  const smaller_down = space_left < space_bottom ? space_left : space_bottom

  for (let i = 0; i < smaller_down; i++) {
    if (game_field.value[col-smaller_down+i][pos+smaller_down-i] !== current_player.value){
      connected = 1
      continue
    }
    connected++
    if(connected === 4){return  true}
  }

  const smaller_up = space_right < space_top ? space_right : space_top

  for (let i = 1; i < smaller_up; i++) {
    if (game_field.value[col+i][pos-i] !== current_player.value){
      break
    }
    connected++
    if(connected === 4){return  true}
  }

  return false
}
function checkDraw():boolean{
  for (let i = 0; i < 7; i++) {
    if (findLowestPosInColumn(game_field.value[i]) !== -1){
      return false
    }
  }
  return true
}
/** winner: 0 = draw 1/2 = player number that won */
function endGame(winner_id:number){
  winner.value = winner_id
  if (winner.value === 1){player_1_wins.value++}
  else if (winner.value === 2){player_2_wins.value++}
  store.pauseGame()
}

onMounted(() =>{
  document.getElementById('col0').append(document.getElementById('marker'))
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() =>{
  window.removeEventListener('keydown',handleKeyDown)
  clearInterval(interval)
  checkForCPUFirstMove()
})
defineExpose({checkForCPUFirstMove})
</script>

<style scoped>
  @import "@/assets/TheGameField.css";
</style>