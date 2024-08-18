<template>
  <div class="home-screen">
    <header class="header">
      <div class="user-info">
        <img src="../assets/Image.png" class="user-avatar" />
        <div class="user-details">
          <p class="welcome">Hi, Sebastian!</p>
          <p class="subtitle">Let's watch movie together!</p>
        </div>
      </div>
      <button class="icon-container">
        <img src="../assets/noti.svg" alt=""></img>
      </button>
    </header>

    <div class="search-bar">
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" placeholder="Search movie, cinema, genre..." />
      </div>
    </div>

    <section class="section now-playing">
      <div v-if="loading" class="loading">Loading movies...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="section-header">
          <h2>Now playing</h2>
          <a href="#" class="see-all">See all</a>
        </div>
        <swiper
          :initialSlide="2"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :spaceBetween="20"
          :loop="true"
          :pagination="{ clickable: true, el: '.swiper-pagination'}"
          :modules="modules"
          class="mySwiper"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="movie in moviesArray" :key="movie.id" @click="goToMovieDetail(movie.id)">
            <img :src="movie.imagen" :alt="movie.titulo" class="movie-image" />
            {{ console.log(movie) }}
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="movie-info">
          <!-- <h2 class="movie-title">{{ currentMovie.titulo }}</h2>
          <p class="movie-genre">{{ currentMovie.genero }}</p> -->
        </div>
      </div>
    </section>

    <section class="coming-soon">
      <div class="section-header">
        <h2>Coming soon</h2>
        <a href="#" class="see-all">See all</a>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="comingSoonGallery">
        <div v-for="movie in moviesComingSoon" :key="movie.id" class="cardContainer">
          <div class="commingSoonCard" @click="goToMovieDetail(movie.id)">
            <img :src="movie.imagen" :alt="movie.titulo" class="comingSoonImage" />
            <div class="comingSoonInfo">
              <h3 class="movie-title">{{ movie.titulo }}</h3>
              <p class="movie-genre">{{ movie.genero }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
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
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'vue-router';
import  { useMovieStore } from '../store/movieStore.js';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const movieStore = useMovieStore();
    const router = useRouter();
    const { moviesArray } = storeToRefs(movieStore);
    onMounted(()=>{
      movieStore.fetchMovies();
    })
    return {
      modules: [Pagination],
      moviesArray,
    };
  },
  data() {
    return {
      moviesComingSoon: [],
      loading: true,
      error: null,
      currentIndex: 0,
    };
  },
    computed: {
    currentMovie() {
      return this.movieArray[this.currentIndex] || {};
    },
  }, 
  methods: {
    fetchMoviesComingSoon() {
      fetch('http://localhost:3001/movies/api/v5')
        .then(response => response.json())
        .then(data => {
          this.moviesComingSoon = data;
          this.loading = false;
        })
        .catch(error => {
          this.error = 'Error loading movies';
          this.loading = false;
        });
    },
    goToMovieDetail(id) {
      this.$router.push({ name: 'MovieDetail', params: { id } });
    },
    onSwiper(swiper) {
      this.currentIndex = swiper.realIndex;
    },
    onSlideChange(swiper) {
      this.currentIndex = swiper.realIndex;
    },
  },
  
  mounted() {
    this.fetchMoviesComingSoon();
  }
};
</script>
  
<style scoped>
  .home-screen {
    background-color: #121212;
    overflow-y: scroll  ;
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-family: Arial, sans-serif;
    padding: 0px 0px;
    width: 100%;
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
    margin-bottom: 10px;
    margin-top: 25px;
    margin-left: 5vw;
  }
  .movies-slider {
  width: 100%;
  padding: 10px 0;
  }

  .movie-card {
    text-align: center;
    width: 100%;
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

    
  .user-info {
    display: flex;
    align-items: center;
  }
    
  .user-avatar {
    border-radius: 50%;
    width: 46px;
    height: 48px;
  }

  .user-details {
    margin-left: 10px;
  }
  .user-details > p{
    font-family: "Inter", sans-serif;
    margin-bottom: 5px;
  }
  .welcome{
    margin-top: 0;
    font-size: 14px;
    font-weight: 300;
  }
  .subtitle {
    margin-top: 5px;
    font-size: 15px;
    font-weight: "Bold";
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
  margin-right: 10px;
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
    font-family: "Inter", sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 5vw;
  }
  .section-header h2{
    font-size: 18px
  }

  .see-all {
    color: #ff0000;
    margin-right: 5vw;
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
    height: 319px;
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
  .coming-soon{
    margin-bottom: 15vh
  }
  .comingSoonGallery{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .cardContainer{
    display: flex;
    align-items: center;
    align-self: center;
    margin-bottom: 5vw;
    background-color: #272727;
    border-radius: 20px;
    width: 90%;
    height: 98px;
    
  }
  .commingSoonCard{
    display: flex;
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
  }

  .comingSoonImage{
    width: 80px;
    height: 80px;
    object-fit: cover;
    align-self: center;
    margin: 0;
    border-radius: 20px;
  }

  .comingSoonInfo{
    margin-left: 3vw;
    max-width: 200px;
    text-wrap: nowrap;
    overflow: hidden;
  }
  .comingSoonInfo h3{
    font-family: "Poppins", sans-serif;
    font-size: 16px;
  }
  .comingSoonInfo p{
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    color: #ffffff;
    font-weight: "light";
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
    position: fixed;
    justify-content: space-around;
    padding: 25px 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width: 100%;
    bottom: 0;
    background-color: #232323;
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

.swiper {
    width: 100%;
    min-height: 445px;
    position: relative;
    z-index: 0;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    width: 204px;
    height: 319px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
}

.swiper-slide img {
    display: block;
    width: 204px;
    height: 100%;

    object-fit: cover;
    border-radius: 20px;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #ffffff;
  opacity: 1;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #FE0000;
  width: 24px;
  border-radius: 5px;
  transition: all 0.3s ease; 
}

.movie-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: -65px;
    position: relative;
    height: 0;
}

.movie-title {
    padding: 0;
    margin: 0;
    font-size: 18px;
    color: var(--text-color);
    text-align: center;
}

.movie-genre {
    color: rgba(var(--text-color-rgb), 0.6);
    font-weight: 700;
    padding: 0;
    margin: 0;
}
</style>
