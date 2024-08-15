<template>
     <div class="header">
    <button class="back-button" @click="goBack()">
      <img src="../assets/arrow-right.svg" alt="">
    </button>
    <h2>Cinema Selection</h2>   
    <button class="more-options-button">
       <img src="../assets/more-vertical.svg" alt="">
    </button>
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
  methods: {
    goBack() {
          this.$router.push({ name: 'Home'});
        
    },

  }
};
</script>

<style scoped>
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

</style>