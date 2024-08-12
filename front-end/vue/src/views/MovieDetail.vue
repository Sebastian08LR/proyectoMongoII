<template>
    <div>
      <MovieDetail/>
    </div>
  </template>
  
  <script>
  import MovieDetail from '../components/MovieDetail.vue';
  
  export default {
    name: 'MovieDetailView',
    components: {
        MovieDetail,
    },
  };
  </script>