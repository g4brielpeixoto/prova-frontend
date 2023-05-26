import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
  {
    path: '/produtos',
    name: 'Produtos',
    component: () => import('./views/Produtos.vue'),
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: () => import('./views/Produto.vue'),
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('./views/Categorias.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Produtos' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
