<template>
    <div class="gallery-container">
      <div class="gallery">
        <div v-if="loading" class="loading">Cargando películas...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="movies">
          <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="movie.imagen" :alt="movie.titulo" class="movie-image" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        movies: [],
        loading: true,
        error: null,
      };
    },
    mounted() {
      fetch('http://localhost:3001/movies/api/v1')
        .then(response => response.json())
        .then(data => {
          this.movies = data;
          this.loading = false;
        })
        .catch(err => {
          this.error = 'Hubo un problema al cargar las películas.';
          this.loading = false;
        });
    },
  };
  </script>
  
  <style scoped>
  body {
    width: 100svw;
    overflow-x: hidden;
  }

  .gallery-container {
    width: 85dvw;
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px;
  }
  
  .gallery {
    display: flex;
  }
  
  .movie-card {
    display: inline-block;
    border-radius: 10px;
    margin-right: 10px;
    padding: 10px;
    width: 200px;
    text-align: center;
    white-space: normal; /* Para que el texto se ajuste dentro del card */
  }
  
  .movie-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .movie-title {
    font-size: 18px;
    margin-top: 10px;
  }
  
  .loading,
  .error {
    font-size: 20px;
    color: #ff0000;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  