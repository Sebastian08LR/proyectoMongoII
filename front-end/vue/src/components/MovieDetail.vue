<template>
  <headerNav></headerNav>
  <div class="MovieSelected">
   <div class="ImageContainer">
      <loading v-if="loading" route="Home" ></loading>
      <img v-else :src="movie.imagen" alt="Movie Image">
    </div>

    <div class="TralierBottom" v-if="!loading">
      <button class="trailer-button">
        <img src="../assets/play.svg" alt=""></img>
        <span>Watch Trailer</span>
      </button>
    </div>

    <div class="MovieDetails">
      <p v-if="!loading">{{ movie.sinopsis }}</p>
      <h2 class="castHeader">Cast</h2>
      <loading v-if="loading"></loading>
      <div v-if="movie && movie.actores" class="cast">
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
        <div class="cinemaItem" :class="{ 'selected': selectedCinema === 'CineCampus' }" @click="selectCinema('CineCampus')">
          <div class="cinemaInfo">
            <h3>CineCampus</h3>
            <p>12:00 PM</p>
          </div>
          <img class="cinemaImage" src="https://placehold.jp/50x50.png">
        </div>
        <div class="cinemaItem" :class="{ 'selected': selectedCinema === 'CineLands' }" @click="selectCinema('CineLands')">
          <div class="cinemaInfo">
            <h3>CineLands</h3>
            <p>14:00 PM</p>
          </div>
          <img class="cinemaImage" src="https://placehold.jp/50x50.png">
        </div>
      </div>
    </div>
    <div class="bookingContainer">
      <div class="bookNow" @click="goToReservation()">
          <h2>Book Now</h2>
      </div>
    </div>

    <div v-if="!movie && !loading">
      <p>Loading movie details...</p>
    </div>
  </div>
</template>


<script>
import { useMovieStore } from '../store/movieStore';

import headerNav from './headerNav.vue';
import loading from './loading.vue';
export default {
  components: {
    headerNav,
    loading
  },
  data() {
    return {
      movie: null,
      loading: true, // Variable de estado de carga
      selectedCinema: null // Variable para seleccionar el cine
    };
  },
  computed: {
    movieId() {
      return this.$route.params.id; // Obtén el ID desde la URL
    }
  },
  mounted() {
    this.fetchMovieDetails();
  },
  methods: {
    fetchMovieDetails() {
      const movieStore = useMovieStore();
      const selectedMovie = movieStore.getMovieById(parseInt(this.movieId)); // Busca la película en el store
      
      if (selectedMovie) {
        this.movie = selectedMovie; // Si la película está en el store, úsala
      } else {
        // Si no está en el store, haz la petición a la API
        fetch(`http://localhost:3001/movies/api/v2?id=${this.movieId}`)
          .then(response => response.json())
          .then(data => {
            this.movie = data;
            this.loading = false; // Finaliza la carga cuando se reciben los datos
          })
          .catch(error => console.error('Error fetching movie details:', error));
      }
    },
    goBack() {
      this.$refs.headerNav.goBack();
    },
    selectCinema(cinema) {
      this.selectedCinema = cinema;
    },
    goToReservation() {
      this.$router.push({ name: 'reservation' });
    },
  }
};
</script>

<style scoped>
.MovieSelected{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000000;
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
  object-fit:cover;
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

.trailer-button span{
  font-size: 1em;
  font-weight: bold;
  text-wrap: nowrap;
}
.trailer-button img {
  margin-right: 8px;
  font-size: 1em;
}

.watch-trailer-button span {
  line-height: 1;
}

.MovieDetails{
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
  padding-right: 3vw;
  margin-bottom: 2.5vh;
}
.MovieDetails p{
    font-size: 12px;
}
.spinner {
  
  animation: spin 1s linear infinite;
} 

.cast{
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  justify-content: space-around;
}

.actor{
  display: flex;
  width: fit-content;
  text-wrap: nowrap;
  align-items: center;
  margin-right: 2vw;
}
.castHeader{
  margin-top: 1vh;
  margin-bottom: 2vh;
  font-size: 16px;
  font-weight: bold;
}
.PjIcone img{
  object-fit: contain;
  border-radius: 25px;
  width: 41px;
  height: 41px;
}
.actorInfo{
  font-family: "Poppins", sans-serif;
  margin-left: 5px;
  text-align: left;
}
.actor h3{
  margin: 0;
  font-size: 8px;
  font-weight: bold;
}

.actor p{
  margin-top:0;
  margin-bottom: 0;
  font-weight: light;
  font-size: 8px;
}
.cinema{
  padding-left: 3vw;
  padding-right: 3vw;
}
.cinemaContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cinemaContainer img{
  border-radius: 5px;
  width: 48px;
  height: 48px;
  margin-right: 19.50px;
  margin-top: 4px;
  margin-bottom: 4px;
}
.cinemaItem{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:#272727;
  border-radius: 10px;
  font-weight: bold;
  margin-bottom: 1vh;
  height: 55px;
  width: 90%;
}
.cinemaItem.selected {
  border: 2px solid red;
}

.cinemaInfo{
  margin-left: 13.33px;
}
.cinemaItem h3{
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  margin: 0;
}

.cinemaItem p{
  font-family: "Poppins", sans-serif;
  font-size: 10px;
  font-weight: 300;
  margin: 0;
}
.bookingContainer{
  margin-top: 54px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.bookNow{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FE0000;
  height: 48px;
  width: 90%;
  border-radius: 10px;
}
.bookNow h2{
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
}
.cinemaHeader{
  margin-top: 0;
  margin-bottom: 2vh;
  font-size: 16px;
  font-weight: bold;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
