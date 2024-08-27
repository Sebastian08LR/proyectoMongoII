<template>
    <div class="ticketsGallery">
        <headerNav :key="$route.fullPath"></headerNav>
        <div class="ticket-container">
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="[EffectCards]"
      class="mySwiper"
    >
      <swiper-slide v-for="seat in selectedSeats" :key="seat.numero + seat.fila">
        <div class="ticket">
          <div class="img-container">
            <img :src="movie.imagen" alt="ticket image">
          </div>
          <div class="movie-footer">
            <h2>{{ movie.titulo }}</h2>
            <p>Show this ticket at the entrance</p>
          </div>
          <div class="ticket-info">
            <div class="ticketInfoHeader">
              <div class="cinemaInfo">
                <h3>Cinema</h3>
                <h2>{{ selectedCinema.name }}</h2>
              </div>
                <img src="../assets/cinemaLogo.png" alt="">
            </div>
            <div class="showInfo">
              <div class="left">
                <h3>Date</h3>
                <p>{{ diaSeleccionado }}</p> 
                
                <h3>Cinema Hall #</h3>
                <p>Cinema A</p>
                
                <h3>Cost</h3>
                <p>$24.99</p>
              </div>
              <div class="right">
                <h3>Time</h3>
                <p>{{ horarioSeleccionado.hora }}</p> 
                
                <h3>Seat</h3>
                <p>{{ seat.numero }}{{ seat.fila }}</p>
                
                <h3>Order ID</h3>
                <p>C442342342</p>
              </div>
            </div>
            <div class="barCode">
                <img src="../assets/BarCode.svg">
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
    </div>
    
</template>

<script>
    import loading from './loading.vue'
    import headerNav from './headerNav.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import { onMounted, ref, computed, watch, onUnmounted} from 'vue';
    import { useSeatsStore } from '../store/reservationStore.js';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { EffectCards } from 'swiper/modules';

    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/effect-cards';

    export default {
        components: {
            loading,
            headerNav,
            Swiper,
            SwiperSlide,
        },
        setup() {
            const router = useRouter();
            const seatsStore = useSeatsStore();
            const { selectedSeats, diaSeleccionado, horarioSeleccionado, functions, movie, selectedCinema, isLoading } = storeToRefs(seatsStore);

            return {
            selectedSeats,
            diaSeleccionado,
            horarioSeleccionado,
            functions,
            movie,
            isLoading,
            selectedCinema,
            EffectCards
        };

        }
    }
</script>

<style scoped>
    .swiper {
        width: 100%;
        height: 75vh;
        scrollbar-width: none; /* Para Firefox */
        -ms-overflow-style: none;
    }
    .swiper::-webkit-scrollbar {
        display: none; /* Para Chrome, Safari y Opera */
    }
    .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        font-size: 22px;
        font-weight: bold;
        color: #fff;
    }
    .ticketsGallery{
        height: 100vh;
        background-color: #121212;
        display: flex;
        flex-direction: column;
    }
    .ticket-container{
        padding-top: 50px;
        padding-right: 34px;
        padding-left: 34px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        gap: 20px;
        justify-content: center;
    }
    .ticket{
        padding: 20px 23px;
        width: 100%;
        height: 70vh;
        border-radius: 20px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
    .img-container{
        background-color: #121212;
        height: 123px;
        border-radius: 10px;
        overflow: hidden;
    }
    .img-container img{
        height: 300px;
        width: 100%;
        object-fit: cover;
    }
    .movie-footer{
        margin-top: 6px;
        color: #121212;
        padding-bottom: 26px;
        border-bottom: 1px solid #D9D9D9;
    }
    .movie-footer h2{
        margin: 0;
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
    }
    .movie-footer p{
        margin: 0;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        color: #787878;
        font-weight: 400;
    }
    .ticket-info h3{
        margin: 0;
        font-size: 13px;
        margin-top: 15px;
        color: #787878;
    }
    .ticket-info p{
        margin: 0;
        margin-top: 6px;
        font-size: 15px;
        color: #000000;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
    }
    .ticketInfoHeader{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .ticketInfoHeader img{
        align-self: center;
    }
    .cinemaInfo h2{
        margin: 0;
        color: #000000;
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
    }
    .showInfo{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-bottom: 21px;
        border-bottom: 1px dashed #D9D9D9;
    }
    .left{
        display: flex;
        flex-direction: column;
        width: 40%;
        justify-content: space-between;
    }
    .right{
        display: flex;
        flex-direction: column;
        width: 40%;
        justify-content: space-between;
    }
    .barCode{
        display: flex;
        margin-top: 17px;
        justify-content: center;
    }
</style>