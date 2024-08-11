<template>
  <div>
    <MoviesGallery :movieId="'1'" :functionId="'2'" />
  </div>
</template>

<script>
import CinemaSeats from './components/CinemaSeats.vue'
import MoviesGallery from './components/MoviesGallery.vue';


export default {
  name: 'App',
  components: {
    MoviesGallery
  }
}
</script>