import BasketView from '@/view/BasketView.vue'
import DetailsView from '@/view/DetailsView.vue'
import HomePage from '@/view/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      component:HomePage
    },
    {
      path:'/products/:id',
      component:DetailsView
    },
    {
      path:'/basket',
      component:BasketView,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior:'smooth' };
  },
})

export default router
