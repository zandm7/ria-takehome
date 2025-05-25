import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/weather',
    },

    {
      path: '/weather',
      redirect: '/weather/losangeles',
      children: [
        {
          path: ':city',
          component: () => import('../views/WeatherView.vue'),
        },
      ],
    },

    {
      path: '/:any',
      redirect: '/weather',
    },
  ],
})

export default router
