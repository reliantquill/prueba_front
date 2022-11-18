import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }, {
    path: '/menus',
    component: () => import('@/views/MenusView.vue'),
    children: [
      { path: '/productos', component: () => import('@/pages/productosPage.vue') },
      { path: '/pedidos', component: () => import('@/pages/pedidosPage.vue') }
    ]
  }, {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
