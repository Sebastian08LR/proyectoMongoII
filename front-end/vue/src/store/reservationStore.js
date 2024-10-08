import { defineStore } from 'pinia';
import { watch } from 'vue';
export const useSeatsStore = defineStore('seats', {
  state: () => ({
    seatsData: [],
    functions: [],
    isLoading: true,
    error: null,
    diaSeleccionado: null,
    horarioSeleccionado: null,
    selectedSeats: [],
    movie: null,
    selectedCinema: null,
    cinemas: [
      { id: 'CineCampus', name: 'CineCampus', time: '12:00 PM' },
      { id: 'CineLands', name: 'CineLands', time: '14:00 PM' }
    ]
  }),
  actions: {
    resetState() {
      this.seatsData = [];
      this.functions = [];
      this.isLoading = true;
      this.error = null;
      this.diaSeleccionado = null;
      this.horarioSeleccionado = null;
      this.selectedSeats = [];
    },
    async fetchMovieDetails(movieId) {
      this.isLoading = true;
      try {
        console.log(movieId);
        const response = await fetch(`http://localhost:3001/movies/api/v2?id=${movieId}`);
        console.log(response);
        const data = await response.json();
        this.movie = data;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        this.loading = false;
      }
    },
    selectCinema(cinemaId) {
      this.selectedCinema = this.cinemas.find(cinema => cinema.id === cinemaId);
    },
    resetSelection() {
      this.selectedCinema = null;
    },
    getSeats(movieId, functionId) {
      console.log(movieId, functionId);
      fetch(`http://localhost:3001/movies/api/v4?movieId=${movieId}&functionId=${functionId}`)
        .then(response => response.json())
        .then(data => {
          this.seatsData = data;
          this.isLoading = false;
        })
        .catch(error => {
          this.error = 'Error loading seats';
          this.isLoading = false;
        });
    },
    getMovieFunctions(movieId) {
      this.isLoading = true;
      fetch(`http://localhost:3001/movies/api/v3?movieId=${movieId}`)
        .then(response => response.json())
        .then(data => {
          this.functions = data;
          this.isLoading = false;
          if (this.functions.length > 0) {
            const primerDia = this.diasUnicos[0];
            if (primerDia) {
              this.seleccionarDia(primerDia.fecha);
            }
          }
        })
        .catch(error => {
          this.error = 'Error loading movie functions';
          this.isLoading = false;
        });
    },
    seleccionarDia(fecha) {
      this.diaSeleccionado = fecha;
      const horarios = this.horariosDelDiaSeleccionado;
      if (horarios.length > 0) {
        this.seleccionarHorario(horarios[0]);
      } else {
        this.horarioSeleccionado = null;
      }
    },
    seleccionarHorario(horario) {
      this.horarioSeleccionado = horario;
    },
    toggleSeat(seat) {
      if (seat.estado === 'disponible') {
        const seatIndex = this.selectedSeats.findIndex(
          selectedSeat => selectedSeat.fila === seat.fila && selectedSeat.numero === seat.numero
        );
        if (seatIndex > -1) {
          this.selectedSeats.splice(seatIndex, 1);
        } else {
          this.selectedSeats.push({ fila: seat.fila, numero: seat.numero });
        }
      }
    }
  },
  getters: {
    funcionesFiltradas(state) {
      const hoy = new Date();
      const hoyISO = hoy.toISOString().split('T')[0]; // Solo la parte de la fecha
      const filtradas = state.functions.filter(funcion => {
        const fechaFuncionISO = funcion.fecha.split('T')[0]; // Solo la parte de la fecha
        return fechaFuncionISO >= hoyISO;
      });
      return filtradas;
    },    
    diasUnicos(state) {
      const diasUnicos = new Map();
      this.funcionesFiltradas.forEach(funcion => {
        const fecha = funcion.fecha.slice(0, 10); // Obtener solo la fecha sin la hora
        if (!diasUnicos.has(fecha)) {
          const date = new Date(funcion.fecha);
          diasUnicos.set(fecha, {
            fecha,
            nombreDia: this.obtenerNombreDia(funcion.fecha),
            numeroDia: date.getDate()
          });
        }
      });
      return Array.from(diasUnicos.values());
    },
    horariosDelDiaSeleccionado(state) {
      if (!state.diaSeleccionado) return [];
      return this.funcionesFiltradas
        .filter(f => f.fecha.slice(0, 10) === state.diaSeleccionado)
        .map(f => ({
          id: f.id,
          hora: f.hora
        }));
    },
    obtenerNombreDia: (state) => (fecha) => {
      const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return dias[new Date(fecha).getDay()];
    },
    getGroupedSeats(state) {
      const grouped = {};
      state.seatsData.forEach(seat => {
        if (!grouped[seat.fila]) {
          grouped[seat.fila] = [];
        }
        grouped[seat.fila].push(seat);
      });
      return grouped;
    }
  }  
});