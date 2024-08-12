<template>
  <div class="header">
    <button class="back-button">
      <i class="fas fa-chevron-left"></i>
    </button>
    <h2>Cinema Selection</h2>   
    <button class="more-options-button">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="MovieSelected">
   <div class="ImageContainer">
      <div v-if="loading" class="spinner"></div>
      <img v-else :src="movie.imagen" alt="Movie Image">
    </div>

    <div class="TralierBottom" v-if="!loading">
      <button class="trailer-button">
        <i class="fas fa-play"></i>
        <span>Watch Trailer</span>
      </button>
    </div>

    <div class="MovieDetails">
      <p v-if="!loading">{{ movie.sinopsis }}</p>
      <h2>Cast</h2>
      <div class="cast">
        <ul v-if="movie && movie.actores">
          <li v-for="actor in movie.actores" :key="actor.id">{{ actor.nombre }}</li>
        </ul>
      </div>
    </div>

    <div v-if="!movie && !loading">
      <p>Loading movie details...</p>
    </div>
  </div>
</template>


<script>
import { useMovieStore } from '../store/movieStore';
export default {
  data() {
    return {
      movie: null,
      loading: true, // Variable de estado de carga
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
    }
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
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #000000;
  color: #fff;
  height: 5vh;
}
.back-button {
  width: 40px;
  height: 40px;
  background-color: #000000;
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
  background-color: #000000;
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

.ImageContainer{
  margin-bottom: 1.5vh;
  width: 95%;
  height: 30vh;
  overflow: hidden;
  align-self: center;
  border-radius: 10px;


}
.ImageContainer img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}
.TralierBottom{
  display: flex;
  justify-content: end;
  padding-right: 5vw;
  margin-bottom: 1vh;
}
.trailer-button {
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  font-size: 0.8em;
  cursor: pointer;
}
.trailer-button i {
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
}
.MovieDetails p{
    font-size: 0.8em;
}
.spinner {
  position: absolute;
  top: 20vh;
  left: 45vw;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
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
