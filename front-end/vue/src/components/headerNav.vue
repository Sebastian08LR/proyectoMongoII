<template>
  <div class="header" :class="{ 'gradient-background': useGradient }">
    <button class="back-button" @click="goBack">
      <img src="../assets/arrow-right.svg" alt="">
    </button>
    <h2>{{ headerTitle }}</h2>   
    <button class="more-options-button">
       <img src="../assets/more-vertical.svg" alt="">
    </button>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, computed, watch} from 'vue';
export default {
  props: {
    useGradient: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const goBack = () => {
      if (route.name === 'reservation') {
        const movieId = route.params.movieId;
        if (movieId) {
          router.push({ name: 'MovieDetail', params: { id: movieId } });
        } else {
          router.push('/');
        }
      } else if (route.name === 'PaymentView') {
        // Volver a la vista de reservación
        const movieId = route.params.movieId;
        router.push({ name: 'reservation', params: { movieId } });
      } else if(route.name === 'TicketsView'){
        router.push('/');
      } else {
        router.push('/');
      }
    };

      const headerTitle = computed(() => {
        switch(route.name) {
          case 'reservation':
            return 'Choose Seat';
          case 'PaymentView':
            return 'Order Summary';
          case 'TicketsView':
            return 'Ticket'
          default:
            return 'Cinema Selection';
        }
      });

    return {
      goBack,
      headerTitle,
    };
  }
};
</script>

<style scoped>
    .header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #121212;
  color: #fff;
  height: 5vh;
}
.gradient-background {
  background: transparent
}
.back-button {
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.back-button i {
  color: #ffffff36;
  font-size: 18px;
}
.more-options-button {
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.more-options-button i {
  color: #ffffff;
  font-size: 18px;
}
.header h2{
  font-size: 1.3em;
  font-weight: bold;
}

</style>