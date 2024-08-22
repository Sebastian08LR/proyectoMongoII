import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    moviesComingSoon: [],
    selectedMovie: null,
    isLoading: true,
  }),
  actions: {
    setMovies(movies) {
      this.movies = movies;
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
    },
    setMoviesComingSoon(moviesComingSoon){
      this.moviesComingSoon = moviesComingSoon;
    },
    fetchMovies() {
      // Aquí iría el fetch a la API
      fetch('http://localhost:3001/movies/api/v1')
        .then(response => response.json())
        .then(data => {
          this.setMovies(data);
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching movies:', error);
          this.isLoading = false;
        });
    },
    fetchMoviesComingSoon() {
      fetch('http://localhost:3001/movies/api/v5')
        .then(response => response.json())
        .then(data => {
          this.setMoviesComingSoon(data)
          this.isLoading = false;
        })
        .catch(error => {
          this.error = 'Error loading movies';
          this.isLoading = false;
        });
    }
  },
  getters: {
    moviesArray: (state) => state.movies,
    moviesComingSoonArray: (state) => state.moviesComingSoon, 
  }
});
