<template>
  <div class="seat-container">
    <div v-for="(fila, letra) in groupedSeats" :key="letra" :class="['seat-row', {'extra-space': letra === 'C'}]">
      <div class="row-letter">{{ letra }}</div>
      <div v-for="seat in fila" :key="seat.numero" :class="['seat', getSeatClass(seat)]" @click="toggleSeat(seat)">
        <span v-if="seat.selected">{{ seat.numero }}</span>
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
      selectedSeats: []
    }
  },
  computed: {
    groupedSeats() {
      const grouped = {};
      this.seats.forEach(seat => {
        if (!grouped[seat.fila]) {
          grouped[seat.fila] = [];
        }
        grouped[seat.fila].push({ ...seat, selected: false });
      });
      return grouped;
    }
  },
  methods: {
    getSeatClass(seat) {
      if (seat.selected) return 'selected';
      return seat.estado;
    },
    toggleSeat(seat) {
      if (seat.estado === 'disponible') {
        seat.selected = !seat.selected;
      }
    }
  }
}
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
}

.seat.ocupado {
  background-color: #CECECE;
}

.seat.selected {
  background-color: #dc3545;
}
</style>