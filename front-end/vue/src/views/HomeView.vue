<template>
    <div>
      <MoviesGallery/>
    </div>
  </template>
  
  <script>
  import MoviesGallery from '../components/MoviesGallery.vue';
  
  export default {
    name: 'HomeView',
    components: {
      MoviesGallery,
    },
  };
  </script>
  