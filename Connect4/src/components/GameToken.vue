<template>
  <img :src="'/src/assets/svg/'+token_img_name" alt="Game Token">
</template>

<script setup lang="ts">
  import {computed} from "vue";

  const props = defineProps(['token'])
  const token_img_name = computed(() =>{
    return props.token === 1 ? 'pink_token.svg' : 'yellow_token.svg'
  })
</script>

<style scoped>
@media (max-width: 500px) {
  img{
    width: calc((80vw - 50px - (6 * 5px))/6) ;
    height:  calc((80vw - 50px - (6 * 5px))/6);
  }
}

</style>