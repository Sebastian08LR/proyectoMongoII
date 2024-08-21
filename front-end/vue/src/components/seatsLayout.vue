<template>
  <div class="seat-container">
    <div v-for="(fila, letra) in groupedSeats" :key="letra" :class="['seat-row', { 'extra-space': letra === 'C' }]">
      <div class="row-letter">{{ letra }}</div>
      <div
        v-for="seat in fila"
        :key="seat"
        :class="['seat', getSeatClass(seat)]"
        @click="toggleSeat(seat, index)"
      >
        <span>{{ seat.numero }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeatLayout',
  props: {
    seats: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      selectedSeats: [] // Almacenar aquí los asientos seleccionados
    };
  },
  computed: {
    groupedSeats() {
      const grouped = {};
      this.seats.forEach(seat => {
        if (!grouped[seat.fila]) {
          grouped[seat.fila] = [];
        }
        grouped[seat.fila].push(seat);
      });
      return grouped;
    }
  },
  methods: {
    getSeatClass(seat) {
      // Verificar si el asiento está seleccionado
      const isSelected = this.selectedSeats.find(
        (selectedSeat) =>
          selectedSeat.fila === seat.fila && selectedSeat.numero === seat.numero
      );
      return isSelected ? "selected" : seat.estado;
    },
    toggleSeat(seat) {
      if (seat.estado === 'disponible') {
        // Buscar el índice del asiento en la lista de seleccionados
        const seatIndex = this.selectedSeats.findIndex(
          selectedSeat => selectedSeat.fila === seat.fila && selectedSeat.numero === seat.numero
        );

        if (seatIndex > -1) {
          // Si ya está seleccionado, deseleccionarlo
          this.selectedSeats.splice(seatIndex, 1);
        } else {
          // Si no está seleccionado, agregarlo a la lista
          this.selectedSeats.push({ fila: seat.fila, numero: seat.numero });
        }
      }
    }

  }
};
</script>

<style scoped>
.seat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.seat-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

.seat-row.extra-space {
  margin-top: 53px;
}

.row-letter {
  font-size: 12px;
  text-align: center;
  color: #ffffff;
}

.seat {
  width: 31px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.seat.disponible {
  background-color: #323232;
  color: #323232;
}

.seat.ocupado {
  background-color: #CECECE;
  color: #CECECE;
}

.seat.selected {
  background-color: #dc3545;
}
</style>
