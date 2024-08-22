<template>
    <div class="buySeat">
        <headerNav></headerNav>
        <div class="screenConrainer">
            <img src="../assets/screen.svg" alt="SCREEN">
            <p>Screen this way</p>
        </div>
        <div class="selectSeatSection">
            <loading v-if="isLoading"></loading>
            <seatsLayout v-if="!isLoading" :seats="seatsData"/>
        </div>
        <div class="statusContainer">
            <div class="seatStatus">
                <div class="colorI"></div>
                <p>Avaliable</p>
            </div>
            <div class="seatStatus">
                <div class="colorII"></div>
                <p>Reserved</p>
            </div>
            <div class="seatStatus">
                <div class="colorIII"></div>
                <p>Selected</p>
            </div>
        </div>
        <div class="dateTimeFunctionContainer">
            <proyections v-if="!isLoading"/>
        </div>
        <div class="confirmSeats">
            <div class="price">
                <h3>Price</h3>
                <h2>$24.99</h2>
            </div>
            <button class="BuyTicketsBtn">Buy Tickets</button>
        </div>
    </div>
</template>

<script>
import seatsLayout from './seatsLayout.vue';
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
        seatsLayout,
        proyections,
    },
    setup() {
        const seatsStore = useSeatsStore();
        const { seatsData, isLoading, error, functions } = storeToRefs(seatsStore);
        const { getSeats, seleccionarDia, seleccionarHorario } = seatsStore;

        // Accedemos a la ruta actual
        const route = useRoute();
        const router = useRouter();

        // Extraemos el movieId de los parámetros de la URL
        const movieId = route.params.movieId;

        const functionId = computed(() => seatsStore.horarioSeleccionado?.id);

        onMounted(() => {
        seatsStore.getMovieFunctions(movieId);
        if (functionId.value) {
            seatsStore.getSeats(movieId, functionId.value);
        }
        });

        // Watch para actualizar los asientos cuando cambie el horario seleccionado
        watch(() => functionId.value, (newFunctionId) => {
        if (newFunctionId) {
            seatsStore.getSeats(movieId, newFunctionId);
        }
        });

        return {
            seatsData,
            functions,
            isLoading,
            error,
            getSeats
        };
    },
}
</script>


<style>
    .spinner {  
    animation: spin 1s linear infinite;
    }
    .buySeat{
        background-color: #121212;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .screenConrainer{
        background-color: #121212;
        padding-top: 4px;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
    }
    .screenConrainer img{
        height: 100%;
        width: 292px;
        align-self: center;
    }
    .screenConrainer p{
        position: absolute;
        top: 20px;
        margin: 0;
        align-self: center;
        font-size: 12px;
    }
    .selectSeatSection{
        display: flex;
        justify-content: center;
        margin-top: 41px;
        background-color: #121212;
    }
    .statusContainer{
        display: flex;
        justify-content: center;
        gap: 31px;
        margin-top: 32px;
    }
    .seatStatus{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        font-size: 12px;
        font-weight: bold
    }
    .colorI{
        height: 12px;
        width: 12px;
        background-color: #323232;
        border-radius: 50%;
    }
    .colorI{
        height: 12px;
        width: 12px;
        background-color: #323232;
        border-radius: 50%;
    }
    .colorII{
        height: 12px;
        width: 12px;
        background-color: #CECECE;
        border-radius: 50%;
    }
    .colorIII{
        height: 12px;
        width: 12px;
        background-color: #FE0000;
        border-radius: 50%;
    }
    .confirmSeats{
        display: flex;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 38px;
        justify-content: space-between;
    }
    .BuyTicketsBtn{
        width: 67%;
        height: 53px;
        background-color: #FE0000;
        font-size: 16px;
        font-weight: bold;
    }
    .price h2{
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }
    .price h3{
        margin: 0;
        font-size: 18px;
    }
    .dateTimeFunctionContainer{
        background-color: #121212;
    }
    .confirmSeats{
        background-color: #121212;
    }
</style>