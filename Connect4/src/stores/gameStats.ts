import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStatsStore = defineStore('gameStats', () => {
  const player_1_wins = ref(0)
  const player_2_wins = ref(0)
  const current_player = ref(1)

  const cpu_active = ref(true)

  const game_field = ref(new Array(7))
  fillGameFieldArray()

  const countDown = ref(30)

  const winner:any = ref(undefined)

  const game_stop = ref(false)

  const starting_player = ref(1)

  function fillGameFieldArray(){
    game_field.value[0]=new Array(6)
    game_field.value[1]=new Array(6)
    game_field.value[2]=new Array(6)
    game_field.value[3]=new Array(6)
    game_field.value[4]=new Array(6)
    game_field.value[5]=new Array(6)
    game_field.value[6]=new Array(6)
  }
  const unpauseGame = () =>{
    game_stop.value = false
  }
  const pauseGame = () =>{
    game_stop.value = true
  }
  const nextPlayer = () =>{
    current_player.value = current_player.value === 1 ? 2 : 1
  }

  const resetTimer = () =>{
    countDown.value = 30
  }

  const resetScore = () =>{
    player_1_wins.value = 0
    player_2_wins.value = 0
  }

  const resetWinner = () =>{
    winner.value = undefined
  }

  const resetCurrentPlayer = () =>{
    current_player.value = starting_player.value
  }

  const switchStartingPlayer = () =>{
    starting_player.value = starting_player.value === 1 ? 2 : 1
  }

  const resetGameField = () =>{
    fillGameFieldArray()
    resetCurrentPlayer()
    resetTimer()
    unpauseGame()
  }
  const nextRound = ()=>{
    switchStartingPlayer()
    resetGameField()
    resetWinner()
    resetTimer()
    unpauseGame()
  }
  const reset = () =>{
    starting_player.value = 1
    resetScore()
    resetGameField()
    resetWinner()
    resetTimer()
    unpauseGame()
  }

  return { player_1_wins, player_2_wins, cpu_active , game_field, current_player, countDown, game_stop, winner, nextPlayer, resetScore, resetGameField,
          reset, resetTimer, unpauseGame, pauseGame, nextRound}
})
