<template>
  <div class="seat-container">
    <div v-for="(fila, letra) in groupedSeats" :key="letra" :class="['seat-row', { 'extra-space': letra === 'C' }]">
      <div class="row-letter">{{ letra }}</div>
      <div class="seats">
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
  </div>
</template>

<script>
import { useSeatsStore } from '../store/reservationStore.js';
import { storeToRefs } from 'pinia';

export default {
  name: 'SeatLayout',
  props: {
    seats: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup() {
    const seatsStore = useSeatsStore();
    const { selectedSeats, getGroupedSeats } = storeToRefs(seatsStore);
    const { toggleSeat } = seatsStore;

    const getSeatClass = (seat) => {
      // Verificar si el asiento está seleccionado
      const isSelected = selectedSeats.value.find(
        (selectedSeat) =>
          selectedSeat.fila === seat.fila && selectedSeat.numero === seat.numero
      );
      return isSelected ? "selected" : seat.estado;
    };

    return {
      selectedSeats,
      getGroupedSeats,
      toggleSeat,
      getSeatClass,
    };
  },
  computed: {
    groupedSeats() {
      return this.getGroupedSeats;
    }
  },
  // ... el resto del componente
}
</script>

<style scoped>
.seats{
  margin-left: 10px;
  display: flex;
  gap: 6px;
  width: 100%;
  align-items: center;
  align-self: center;
  justify-content: center;
}
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
  width: 100%;
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
