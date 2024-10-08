<template>
    <div class="paymentSection">
      <div class="gradient">
        <headerNav :key="$route.fullPath" class="orderNav" :useGradient="true"></headerNav>
        <div class="movieInfo">
          <div class="img-container">
            <img v-if="!isLoading" :src="movie.imagen" :alt="movie">
            <img v-else src="../assets/loading.gif" alt="movie poster">
          </div>
          <div class="movie-info">
            <div class="movie-details">
              <h2>{{ movie.titulo }}</h2>
              <p>{{ movie.genero }}</p>
            </div>
            <div class="proyection-details">
              <h3>{{ selectedCinema.name }}</h3>
              <p>{{ diaSeleccionado }}, {{ horarioSeleccionado.hora }}</p>
            </div>
          </div>
        </div>  
      </div>
      <div class="purchasingDetails">
        <header class="orderNumber">
          <h2>ORDER NUMBER: <span>475677392837</span></h2>
        </header>
        <div class="summary">
          <div class="seatsBought">
            <h2>{{ ticketDetails.count }} TICKET(S)</h2>
            <h2>{{ ticketDetails.seats }}</h2>
          </div>
          <div class="seatsBought">
            <h2>REGULAR SEAT</h2>
            <h2>${{ ticketDetails.price.toFixed(2) }} x {{ ticketDetails.count }}</h2>
          </div>
          <div class="seatsBought">
            <h2>SERVICE FEE</h2>
            <h2>${{ ticketDetails.serviceFee.toFixed(2) }} x 1</h2>
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
                <button class="circular-button" @click="togglePaymentMethod">
                    <div class="inner-circle" :class="{ 'animate': isPaymentMethodSelected }"></div>
                </button>
            </div>
        </div>
        <div class="limitTimeForPurchase">
            <div class="limitCard">
                <p>Complete your payment in</p>
                <h3>{{ formattedTimeRemaining }}    </h3>
            </div>
        </div>
      </div>
      <div class="purchasingContainer">
        <button class="BuyNow" @click="buyTicket" :disabled="!isPaymentMethodSelected">
          <h2>Buy Ticket - ${{ totalPrice }}</h2>
        </button>
      </div>
    </div>
  </template>
    
    <script>
    import loading from './loading.vue'
    import headerNav from './headerNav.vue';
    import proyections from './proyections.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import { onMounted, ref, computed, watch, onUnmounted} from 'vue';
    import { useSeatsStore } from '../store/reservationStore.js';
    
    
    export default {
        components: {
        loading,
        headerNav,
        proyections,
        },
        setup() {
        const router = useRouter();
        const timeRemaining = ref(5 * 60); // 5 minutos en segundos
        const timerInterval = ref(null);
        const isAnimating = ref(false);
        const isPaymentMethodSelected = ref(false);
        const seatsStore = useSeatsStore();
        const { selectedSeats, diaSeleccionado, horarioSeleccionado, functions, movie, selectedCinema, isLoading } = storeToRefs(seatsStore);
       
        const ticketDetails = computed(() => {
            return {
                count: selectedSeats.value.length,
                seats: selectedSeats.value.map(seat => `${seat.fila}${seat.numero}`).join(', '),
                price: 24.99, // Asume un precio fijo por asiento
                serviceFee: 1.99
            };
        });

        const totalPrice = computed(() => {
            return (ticketDetails.value.count * ticketDetails.value.price + ticketDetails.value.serviceFee).toFixed(2);
        });

        const toggleAnimation = () => {
            isAnimating.value = !isAnimating.value;
        };

        const togglePaymentMethod = () => {
        isPaymentMethodSelected.value = !isPaymentMethodSelected.value;
        };

        const buyTicket = async () => {
            console.log('Iniciando compra...');
            
            // Obtener el movieId y projectionId
            const movieId = movie.value.id; // Asumiendo que el id de la película está en movie.value.id
            const projectionId = horarioSeleccionado.value.id; // Asumiendo que el id de la proyección está en horarioSeleccionado.value.id
            
            // Organizar los asientos en el formato requerido
            const seats = selectedSeats.value.map(seat => `${seat.fila}${seat.numero}`).join(',');
            
            // Construir la URL para el fetch
            const url = `http://localhost:3001/movies/api/v4/buyTickets?movieId=${movieId}&projectionId=${projectionId}&seats=${seats}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error en la compra de tickets');
                }
                
                const data = await response.json();
                console.log('Compra exitosa:', data);
                
                router.push({ name: 'TicketsView' });
                
            } catch (error) {
                console.error('Error al comprar tickets:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            }
        };

        const formattedTimeRemaining = computed(() => {
        const minutes = Math.floor(timeRemaining.value / 60);
        const seconds = timeRemaining.value % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });

        const startTimer = () => {
        timerInterval.value = setInterval(() => {
            if (timeRemaining.value > 0) {
            timeRemaining.value--;
            } else {
            clearInterval(timerInterval.value);
            cancelPurchase();
            }
        }, 1000);
        };

        const cancelPurchase = () => {
        console.log('La compra de las boletas ha sido cancelada debido a que se agotó el tiempo.');
        // Aquí puedes agregar cualquier otra lógica necesaria para manejar la cancelación de la compra
        };

        onMounted(() => {
        startTimer();
        });

        onUnmounted(() => {
        if (timerInterval.value) {
            clearInterval(timerInterval.value);
        }
        });

        return {
            toggleAnimation,
            togglePaymentMethod,
            buyTicket,
            formattedTimeRemaining,
            isAnimating,
            isPaymentMethodSelected,
            ticketDetails,
            totalPrice,
            selectedSeats,
            diaSeleccionado,
            horarioSeleccionado,
            functions,
            movie,
            isLoading,
            selectedCinema
        };
    }
    };
    </script>
    
    <style scoped>
    .paymentSection {
        height: 100vh;
        width: 100%;
        background-color: #121212;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
        border-radius: 10px;
        margin-top: 10px;
        margin-left: 30px;
        overflow: hidden;
        }
    .img-container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
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
    .limitTimeForPurchase{
        margin-top: 15px;
    }
    .limitCard{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-top: 13px;
        padding-bottom: 13px;
        background-color: #381818;
        border-radius: 10px;
    }

    .limitCard p{
        margin: 0;
        font-size: 13px;
        margin-left: 16px;
        font-family: 'Inter', sans-serif;
    }
    .limitCard h3{
        margin: 0;
        font-size: 13px;
        margin-right: 15px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        color: #FE0000;
    }
    .purchasingContainer {
    padding-top: 54px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    background-color: #121212;
    }

    .BuyNow {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FE0000;
    height: 48px;
    width: 90%;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: white;
    }

    .BuyNow:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    }

    .BuyNow h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    }

    </style>