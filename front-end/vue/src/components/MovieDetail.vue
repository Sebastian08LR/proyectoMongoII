<template>
  <div class="detailsContainer">
    <headerNav></headerNav>
    <div class="MovieSelected">
      <div v-if="!isLoading" class="ImageContainer">
        <img :src="movie.imagen" alt="Movie Image">
      </div>
      <loading v-else></loading>
      <div class="TralierBottom">
        <button class="trailer-button">
          <img src="../assets/play.svg" alt="">
          <span>Watch Trailer</span>
        </button>
      </div>
      <div v-if="!isLoading" class="MovieDetails">
        <p>{{ movie.sinopsis }}</p>
        <h2 class="castHeader">Cast</h2>
        <div v-if="movie" class="cast">
          <div v-for="actor in movie.actores" :key="actor.id" class="actor">
            <div class="PjIcone">
              <img src="../assets/Ellipse.png" alt="Actor Image">
            </div>
            <div class="actorInfo">
              <h3>{{ actor.nombre }}</h3>
              <p>{{ actor.personaje }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cinema">
        <h2 class="cinemaHeader">Cinema</h2>
        <div class="cinemaContainer">
          <div v-for="cinema in cinemas" :key="cinema.id"
               class="cinemaItem"
               :class="{ 'selected': selectedCinema?.id === cinema.id }"
               @click="selectCinema(cinema.id)">
            <div class="cinemaInfo">
              <h3>{{ cinema.name }}</h3>
              <p>{{ cinema.time }}</p>
            </div>
            <img class="cinemaImage" src="../assets/cinemaLogo.png">
          </div>
        </div>
      </div>
      <div class="bookingContainer">
        <button class="bookNow" @click="goToReservation" :disabled="!selectedCinema">
          <h2>Book Now</h2>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useSeatsStore } from '../store/reservationStore';
import headerNav from './headerNav.vue';
import loading from './loading.vue';

export default {
  components: {
    headerNav,
    loading,
  },
  
  computed: {
    ...mapState(useSeatsStore, ['movie', 'isLoading', 'selectedCinema', 'cinemas']),
    movieId() {
      return this.$route.params.id;
    }
  },
  
  mounted() {
    this.fetchMovieDetails(this.movieId);
  },
  
  methods: {
    ...mapActions(useSeatsStore, ['fetchMovieDetails', 'selectCinema']),
    goToReservation() {
      if (this.selectedCinema) {
        this.$router.push({ name: 'reservation', params: { movieId: this.movieId }});
      }
    }
  }
};
</script>

<style scoped>
.detailsContainer{
  height: 100vh;
  background-color: #121212;
  display: flex;
  flex-direction: column;
}
.MovieSelected{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #121212;
}

.ImageContainer{
  display: flex;
  justify-content: center;
  margin-bottom: 1.5vh;
  width: 95%;
  height: 30vh;
  overflow: hidden;
  align-self: center;
  border-radius: 10px;
}
.ImageContainer img{
  width: 100%;
  height: 170%;
  object-fit: cover;
}
.TralierBottom{
  display: flex;
  justify-content: end;
  padding-right: 6vw;
  margin-bottom: 1vh;
}
.trailer-button {
  display: flex;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 84px;
  height: 22px;
  justify-content: center;
  align-items: center;
  font-size: 0.5em;
  cursor: pointer;
}

.trailer-button span {
  font-size: 1em;
  font-weight: bold;
  white-space: nowrap;
}
.trailer-button img {
  margin-right: 8px;
  font-size: 1em;
}

.MovieDetails {
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-bottom: 2.5vh;
}
.MovieDetails p {
  font-size: 12px;
}

.cast {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  justify-content: space-around;
}

.actor {
  display: flex;
  width: fit-content;
  align-items: center;
  margin-right: 2vw;
}
.castHeader {
  margin-top: 1vh;
  margin-bottom: 2vh;
  font-size: 16px;
  font-weight: bold;
}
.PjIcone img {
  object-fit: contain;
  border-radius: 25px;
  width: 41px;
  height: 41px;
}
.actorInfo {
  margin-left: 5px;
  text-align: left;
}
.actor h3 {
  margin: 0;
  font-size: 8px;
  font-weight: bold;
}

.actor p {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: light;
  font-size: 8px;
}

.cinema {
  padding-left: 3vw;
  padding-right: 3vw;
  background-color: #121212;
}

.cinemaContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cinemaContainer img {
  border-radius: 5px;
  width: 48px;
  height: 48px;
  margin-right: 19.50px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.cinemaItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #272727;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 1vh;
  height: 55px;
  width: 90%;
  cursor: pointer;
}

.cinemaItem.selected {
  border: 2px solid red;
}

.cinemaInfo {
  margin-left: 13.33px;
}

.cinemaItem h3 {
  font-size: 13px;
  margin: 0;
}

.cinemaItem p {
  font-size: 10px;
  font-weight: 300;
  margin: 0;
}

.bookingContainer {
  margin-top: 54px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  background-color: #121212;
}

.bookNow {
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

.bookNow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.bookNow h2 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}

.cinemaHeader {
  margin-top: 0;
  margin-bottom: 2vh;
  font-size: 16px;
  font-weight: bold;
}
</style>
