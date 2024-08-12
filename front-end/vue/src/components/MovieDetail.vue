<template>
  <div v-if="movie">
    <h1>{{ movie.titulo }}</h1>
    <img :src="movie.imagen" alt="Movie Image">
    <!-- Más detalles de la película -->
  </div>
  <div v-else>
    <p>Loading movie details...</p>
  </div>
</template>

  
  <script>
  export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: null,
    };
  },
  mounted() {
    // Llama a la API para obtener los detalles de la película
    this.fetchMovieDetails();
  },
  methods: {
    fetchMovieDetails() {
      // Aquí haces la petición para obtener los detalles de la película usando el `id`
      fetch(`http://localhost:3001/movies/api/v2?id=${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.movie = data;
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }
  }
};
  </script>
  