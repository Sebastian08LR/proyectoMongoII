import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    selectedMovie: null,
  }),
  actions: {
    setMovies(movies) {
      this.movies = movies;
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
    fetchMovies() {
      // Aquí iría el fetch a la API
      fetch('http://localhost:3001/movies/api/v1')
        .then(response => response.json())
        .then(data => {
          this.setMovies(data);
        })
        .catch(error => {
          console.error('Error fetching movies:', error);
        });
    }
  },
  getters: {
    getMovieById: (state) => {
      return (id) => state.movies.find(movie => movie.id === id);
    }
  }
});
