<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'vue-router';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
    const fetchMoviesPlaying = () => {
            fetch('http://localhost:3001/movies/api/v1')
                .then(response => response.json())
                .then(data => {
                movies.value = data;
                console.log(movies.value);
                })
                .catch(err => {
                err.value = 'Error al cargar películas';
                });
    };

    const fetchMoviesComingSoon = () => {
            fetch('http://localhost:3001/movies/api/v5')
                .then(response => response.json())
                .then(data => {
                    moviesComingSoon.value = data;
                })
                .catch(err => {
                err.value = 'Error al cargar películas';
                
                });
    };

    const goToMovieDetail = (id) => {
      const movieStore = useMovieStore();
      const movie = movieStore.getMovieById(id);
      movieStore.selectMovie(movie);
      router.push({ name: 'MovieDetail', params: { id } });
    };

        const router = useRouter();
        fetchMoviesPlaying()
        return {
            modules: [Pagination],
            goToMovieDetail
        };
    

    },
}
</script>

<template>
    <swiper :initialSlide="2" :centeredSlides="true" :slidesPerView="'auto'" :spaceBetween="20" :loop="true" :pagination="{
        clickable: true,
        el: '.swiper-pagination',
    }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="movie in movies" :key="movie.id" @click="goToMovieDetail(movie.id)">
                  <img :src="movie.imagen" :alt="movie.titulo"/>
        </swiper-slide>>

        <div class="swiper-pagination" slot="pagination">
    </div>
    </swiper>
    <div class="movie-info">
        <h2 class="movie-title">{{ movie.titulo }}</h2>
        <p class="movie-genre">{{ movie.genero }}</p>
    </div>
</template>


<style scoped>
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
  background: var(--text-color);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--primary-color);
  width: 24px;
  border-radius: 5px;
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
    font-size: 2rem;
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