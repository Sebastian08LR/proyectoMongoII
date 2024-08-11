<template>
    <div class="cinema">
      <div class="screen">Pantalla</div>
      <div class="seats">
        <div
          v-for="seat in seats"
          :key="`${seat.fila}${seat.numero}`"
          class="seat"
          :class="{ selected: selectedSeats.includes(`${seat.fila}${seat.numero}`) }"
          @click="toggleSeat(`${seat.fila}${seat.numero}`)"
        >
          {{ seat.fila }}{{ seat.numero }}
        </div>
      </div>
      <div class="selected-seats">
        Asientos seleccionados: {{ selectedSeatsText }}
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'CinemaSeats',
    props: {
      movieId: {
        type: String,
        required: true
      },
      functionId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const seats = ref([]);
      const selectedSeats = ref([]);
  
      const fetchSeats = async () => {
        try {
          const response = await fetch(`http://localhost:3001/movies/api/v4?movieId=${props.movieId}&functionId=${props.functionId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          seats.value = data;
        } catch (error) {
          console.error('Error fetching seats:', error);
        }
      };
  
      const toggleSeat = (seatId) => {
        const index = selectedSeats.value.indexOf(seatId);
        if (index === -1) {
          selectedSeats.value.push(seatId);
        } else {
          selectedSeats.value.splice(index, 1);
        }
      };
  
      const selectedSeatsText = computed(() => {
        return selectedSeats.value.join(', ');
      });
  
      onMounted(fetchSeats);
  
      return {
        seats,
        selectedSeats,
        toggleSeat,
        selectedSeatsText
      };
    }
  }
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100svh;
    background-color: #111111;
}

.cinema {
    padding: 0em 2em;
}

.screen {
    background-color: #fff;
    height: 70px;
    width: 100%;
    margin: 15px 0;
    transform: rotateX(-45deg);
    box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444;
    font-size: 18px;
}

.seats {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.seat {
    background-color: #444451;
    height: 30px;
    width: 35px;
    margin: 3px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
}

.seat.selected {
    background-color: #6feaf6;
}

.selected-seats {
    margin-top: 20px;
    font-size: 16px;
    color: white;
}
  </style>