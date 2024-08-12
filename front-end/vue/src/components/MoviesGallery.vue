<template>
    <div class="home-screen">
      <header class="header">
        <div class="user-info">
          <img src="https://via.placeholder.com/50" alt="User" class="user-avatar" />
          <div class="user-details">
            <p>Hi, Sebastian!</p>
            <p class="subtitle">Let's watch movie together!</p>
          </div>
        </div>
        <button class="icon-container">
           <i class="fas fa-bell"></i>
        </button>
      </header>
  
      <div class="search-bar">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search movie, cinema, genre..." />
        </div>
      </div>
  
      <section class="section now-playing">
      <div v-if="loading" class="loading">Cargando películas...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="section-header">
        <h2>Now playing</h2>
        <a href="#" class="see-all">See all</a>
      </div>
      <div class="movies-slider">
        <div class="movie-card" v-for="movie in movies" :key="movie.id" @click="goToMovieDetail(movie.id)">
          <img :src="movie.imagen" :alt="movie.titulo" class="movie-image" />
          <h3 class="movie-title">{{ movie.titulo }}</h3>
          <p class="movie-genre">Adventure</p>
        </div>
      </div>
      <div class="slider-indicator">
        <span v-for="(movie, index) in movies" :key="index" class="indicator"></span>
      </div>
    </section>
  
      <section class="section coming-soon">
        <div class="section-header">
          <h2>Coming soon</h2>
          <a href="#" class="see-all">See all</a>
        </div>
        <div class="movies-slider">
          <!-- Similar slider for coming soon movies -->
        </div>
      </section>
  
      <nav class="bottom-nav">
          <a href="#" class="nav-item active">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-search"></i>
            <span>Browse</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-ticket-alt"></i>
            <span>Tickets</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </a>
      </nav>
    </div>
  </template>
  
  <script>
  import { useMovieStore } from '../store/movieStore.js';
  
  export default {
  data() {
    return {
      movies: [],
      loading: true,
      error: null,
    };
  },
  methods: {
    fetchMovies() {
      fetch('http://localhost:3001/movies/api/v1')
        .then(response => response.json())
        .then(data => {
          this.movies = data;
          this.loading = false;
        })
        .catch(error => {
          this.error = 'Error al cargar películas';
          this.loading = false;
        });
    },
    goToMovieDetail(id) {
        const movieStore = useMovieStore();
        const movie = movieStore.getMovieById(id);
        movieStore.selectMovie(movie);
        this.$router.push({ name: 'MovieDetail', params: { id } });
      }
  },
  mounted() {
    this.fetchMovies();
  }
};
  </script>
  
  <style scoped>
  .home-screen {
    background-color: #121212;
    overflow-y: scroll !important;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-family: Arial, sans-serif;
    padding: 0px 10px;
    width: 95%;
    height: 100vh;
  }
  .loading,
  .error {
    font-size: 20px;
    color: #ff0000;
    text-align: center;
    margin-top: 20px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  
  .user-details {
    margin-left: 10px;
  }
  
  .subtitle {
    color: #888888;
    font-size: 14px;
  }
  .icon-container {
  width: 40px;
  height: 40px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  border: 1px solid white;
  align-items: center;
  border-radius: 8px;
}

.icon-container i {
  color: #ffffff;
  font-size: 20px;
}
  .notification-button {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 20px;
  }
  
  .search-bar {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #2a2a2a;
  border-radius: 10px;
  border: 1px solid white;
  padding: 15px 15px;
  width: 90%;
  max-width: 400px;
}

.search-icon {
  color: #777;
  margin-right: 10px;
}

.search-container input {
  width: 100%;
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  outline: none;
}

.search-container input::placeholder {
  color: #777;
}
  
  .section {
    margin-top: 20px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .see-all {
    color: #ff0000;
  }
  
  .movies-slider {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
    scroll-behavior: smooth;
  }
  
  .movie-card {
    flex-shrink: 0;
    width: 150px;
    margin-right: 10px;
    text-align: center;
    width: 50vw;
  }
  
  .movie-image {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .movie-title {
    font-size: 14px;
    margin: 5px 0;
  }
  
  .movie-genre {
    color: #888888;
    font-size: 12px;
  }
  
  .slider-indicator {
    text-align: center;
    margin-top: 10px;
  }
  
  .indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: #888888;
    border-radius: 50%;
  }
  
  .bottom-nav {
    display: flex;
    position: absolute;
    justify-content: space-around;
    padding: 25px 0;
    border-radius: 1em;
    width: 95%;
    bottom: 2vh;
    background-color: #444444;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #888;
    text-decoration: none;
    font-size: 12px;
  }
  
  .nav-item i{
    font-size: 20px;
    margin-bottom: 5px;
  }
  .nav-item.active {
    color: #e50914; 
  }
  </style>
  