import { createRouter, createWebHistory } from 'vue-router'
import GameView from "@/views/GameView.vue";
import RulesView from "@/views/RulesView.vue";
import StartView from "@/views/StartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
    {
      path: '/play',
      name: 'Play',
      component: GameView
    },
    {
      path: '/rules',
      name: 'Rules',
      component: RulesView
    },
  ]
})

export default router
