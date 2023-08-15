<template>
  <img :src="'/src/assets/svg/'+token_img_name" alt="Game Token">
</template>

<script setup lang="ts">
  import {computed} from "vue";

  const props = defineProps(['token'])
  const token_img_name = computed(() =>{
    console.log()
    return props.token === 1 ? 'pink_token.svg' : 'yellow_token.svg'
  })
</script>

<style scoped>

</style>