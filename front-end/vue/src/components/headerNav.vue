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
import { useMovieStore } from '../store/movieStore';

export default {
  data() {
    return {
      movie: null,
      loading: true,
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    currentRouteName() {
      return this.$route.name;
    },
    headerTitle() {
      switch(this.currentRouteName) {
        case 'reservation':
          return 'Choose Seat';
        default:
          return 'Cinema Selection';
      }
    }
  },
  methods: {
    goBack() {
      switch(this.currentRouteName) {
        case 'reservation':
          this.$router.push(`/movie/${this.movieId}`);
          break;
        default:
          this.$router.push('/');
      }
    },
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