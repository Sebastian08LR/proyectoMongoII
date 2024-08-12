import { createRouter, createWebHistory } from 'vue-router';
import MovieDetail from '../../components/MovieDetail.vue';
import HomeView from '../../components/HomeView.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
