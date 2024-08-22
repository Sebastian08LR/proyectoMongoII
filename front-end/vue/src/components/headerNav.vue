<template>
  <div class="header">
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
  setup() {
    const route = useRoute();
    const router = useRouter();

    const goBack = () => {
      if (route.name === 'reservation') {
        const movieId = route.params.movieId;
        if (movieId) {
          router.push(`/movie/${movieId}`);
        } else {
          router.push('/'); // Fallback a la página principal si no hay movieId
        }
      } else {
        router.push('/');
      }
    };

    const headerTitle = computed(() => {
      return route.name === 'reservation' ? 'Choose Seat' : 'Cinema Selection';
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
.back-button {
  width: 40px;
  height: 40px;
  background-color: #121212;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.back-button i {
  color: #ffffff;
  font-size: 18px;
}
.more-options-button {
  width: 40px;
  height: 40px;
  background-color: #121212;
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