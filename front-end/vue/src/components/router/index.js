import { createRouter, createWebHistory } from 'vue-router';
import MovieDetail from '../../views/MovieDetail.vue';
import HomeView from '../../views/HomeView.vue';
import Reservation from '../../views/Reservation.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    props: true,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true //Permite el uso de los props con el fin de enviar los id's internos para realizar los fetch
  },
  {
    path: '/reservation/:id',
    name: 'reservation',
    component: Reservation,
    props: true //Permite el uso de los props con el fin de enviar los id's internos para realizar los fetch
  
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
