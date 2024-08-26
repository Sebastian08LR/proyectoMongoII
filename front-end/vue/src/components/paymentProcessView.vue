<template>
    <div class="paymentSection">
        <div class="gradient">
            <headerNav :key="$route.fullPath" class="orderNav" :useGradient="true"></headerNav>
            <div class="movieInfo">
                <div class="img-container">
                    <img src="../assets/loading.gif" alt="movie poster">
                </div>
                <div class="movie-info">
                    <div class="movie-details">
                        <h2>Puss in boots the last Wish</h2>
                        <p>Adventure</p>
                    </div>
                    <div class="proyection-details">
                        <h3>HARTONO MALL</h3>
                        <p>Sun, 12 Feb 2024. 13:00</p>
                    </div>
                </div>
            </div>  
        </div>
        <div class="purchasingDetails">
            <header class="orderNumber">
                <h2>ORDER NUMBER: <span>123456786</span></h2>
            </header>
            <div class="summary">
                <div class="seatsBought">
                    <h2>1 TICKET</h2>
                    <H2>C5</H2>
                </div>
                <div class="seatsBought">
                    <h2>REGULAR SEAT</h2>
                    <H2>$24,99 x 3</H2>
                </div>
                <div class="seatsBought">
                    <h2>SERVICE FEE</h2>
                    <H2>$1,99 x 1</H2>
                </div>
            </div>
        </div>
        <div class="paymentMethod">
            <header class="PaymentMethodSection">
                <h2>Payment Method</h2>
            </header>
            <div class="paymentOptions">
                <div class="card">
                    <div class="card-icon">
                        <img src="../assets/Mastercard.svg" alt="credit card">
                    </div>
                    <div class="card-details">
                        <p>MasterCard</p>
                        <h3>**** **** **** 4242</h3>
                    </div>
                    <button class="circular-button" @click="toggleAnimation">
                        <div class="inner-circle" :class="{ 'animate': isAnimating }"></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import loading from './loading.vue'
  import headerNav from './headerNav.vue';
  import proyections from './proyections.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref, computed, watch} from 'vue';
  import { useSeatsStore } from '../store/reservationStore.js';
  
  export default {
    components: {
      loading,
      headerNav,
      proyections,
    },
    setup() {
    const isAnimating = ref(false);

    const toggleAnimation = () => {
      isAnimating.value = !isAnimating.value;
    };

    return {
      isAnimating,
      toggleAnimation
    };
  }
};
  </script>
  
  <style>
  .paymentSection {
    height: 100vh;
    width: 100%;
    background-color: #121212;
  }
  
  .gradient {
    padding-bottom: 41px;
    background: linear-gradient(to top right, #272727 0%, rgba(39, 39, 39, 0) 100%);
   }
  .movieInfo{
    display: flex;

   }
  .img-container{
    width: 112px;
    height: 143px;
    background-color: white;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 30px;
    }
  .img-container img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    }
  .movie-info{
    font-family: 'Inter', sans-serif;
    margin-left: 15px;
    width: 50%;
   }
   .movie-details h2{
    margin: 0;
    margin-top: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #FE0000;
    }
    .movie-details p{
    margin: 0;
    margin-top: 5px;
    color: #ffffff79;
    font-size: 13px;
    }
    .proyection-details h3{
        margin: 0;
        margin-top: 20px;
        font-size: 14px;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
    }
    .proyection-details p{
        margin: 0;
        margin-top: 5px;
        font-size: 13px;
        color: #ffffff79;
    }
    .purchasingDetails{
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 20px;
        margin-bottom: 25px;
    }
    .orderNumber{
        margin-bottom: 10px;
    }
    .orderNumber h2{
        margin: 0;
        font-size: 13px;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        color: #ffffff79;
    }
    .orderNumber span{
        color: #fff;
    }
    .seatsBought{
        display: flex;
        padding-bottom: 16px;
        margin-top: 15px;
        justify-content: space-between;
        border-bottom: 1px solid #ffffff79;
    }
    .seatsBought h2{
        margin: 0;
        font-size: 15px;
        font-weight: 400;
        color: #ffffff79;
    }
    .paymentMethod{
        padding-left: 30px;
        padding-right: 30px;
    }
    .paymentMethod h2{
        font-size: 18px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
    }
    .paymentOptions{
        width: 100%;
    }
    .card{
        display: flex;
        width: 90%;
        align-items: center;
        justify-content: space-between;
        background-color: #272727;
        padding: 0;
        border-radius: 10px;
        padding-top: 13.21px;
        padding-left: 14.15px;
        padding-right: 19px;
        padding-bottom: 8px;
        border: 1px solid #cccccc7c;
    }
    .card-details{
        margin-left: 13.82px;
        width: 65%;
    }
    .card-details p{
        margin: 0;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }
    .card-details h3{
        margin: 0;
        font-size: 12px;
        font-family: 'Poppins', sans-serif;
    }
    .card-icon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-icon img{
        width: 66px;
        height: 43.74px;
        
    }
    .circular-button {
  width: 21.7px;
  height: 21.7px;
  border-radius: 50%;
  background-color: transparent; /* Fondo transparente */
  border: 1px solid #FE0000; /* Borde rojo */
  padding: 0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.inner-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background-color: #FE0000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-out;
}

.inner-circle.animate {
  width: 14.46px;
  height: 14.46px;
}
</style>