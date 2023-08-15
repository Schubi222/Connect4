<template>
  <div class="Game-Field">

    <div class="Game-Field__tile" v-for="(tile, index) in game_field" :key="index">
      <GameToken :token="tile" v-if="tile"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import GameToken from "@/components/GameToken.vue";

const game_field = ref(new Array<undefined|Number>(7*6).fill(undefined))
game_field.value[0]=1
game_field.value[7]=1
game_field.value[8]=1

</script>

<style scoped>
  @import "@/assets/TheGameField.css";
</style>