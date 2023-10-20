import { createRouter, createWebHistory } from 'vue-router';
 import CriarItem from '../components/CriarItem.vue';
 import ListaItens from '../components/ListaItens.vue';

const routes = [  
  { path: '/criar-item', component: CriarItem },
  { path: '/lista-itens', component: ListaItens },
  { path: '/perfil', component: '~/pages/perfil.vue', name: 'perfil' },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
