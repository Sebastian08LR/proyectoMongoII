import { createRouter, createWebHistory } from 'vue-router';
import MovieDetail from '../../views/MovieDetail.vue';
import MovieDetailCommingSoon from '../../views/MovieDetailCommingSoon.vue';
import HomeView from '../../views/HomeView.vue';
import Reservation from '../../views/Reservation.vue';
import paymentProcess from '../../views/PaymentProcess.vue';
import ticketsView from '../../views/ticketsView.vue';

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
    path: '/movie/commingSoon/:id',
    name: 'MovieDetailCommingSoon',
    component: MovieDetailCommingSoon,
    props: true //Permite el uso de los props con el fin de enviar los id's internos para realizar los fetch
  },
  {
    path: '/reservation/:movieId',
    name: 'reservation',
    component: Reservation,
    props: true //Permite el uso de los props con el fin de enviar los id's internos para realizar los fetch
  
  },
  {
    path: '/payment/:movieId',
    name: 'PaymentView',
    component: paymentProcess,
    props: true 
  },
  {
    path: '/tickets',
    name: 'TicketsView',
    component: ticketsView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
