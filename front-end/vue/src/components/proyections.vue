<template>
  <div>
    <h2>Funciones de película</h2>
    <div class="dias">
      <button
        v-for="dia in diasDisponibles"
        :key="dia.fecha"
        @click="seleccionarDia(dia.fecha)"
        :class="{ active: diaSeleccionado === dia.fecha }"
      >
        {{ dia.nombreDia }} {{ dia.numeroDia }}
      </button>
    </div>
    <div class="horarios" v-if="diaSeleccionado">
      <h3>Horarios para {{ obtenerNombreDia(diaSeleccionado) }}</h3>
      <button v-for="horario in horariosDelDiaSeleccionado" :key="horario">
        {{ horario }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funciones: [
        {
          id: 1,
          fecha: "2024-11-11T00:00:00.000Z",
          hora: "14:00",
          sala: "000000000000000000000001"
        },
        {
          id: 2,
          fecha: "2024-11-11T00:00:00.000Z",
          hora: "17:00",
          sala: "000000000000000000000001"
        },
        {
          id: 3,
          fecha: "2024-11-11T00:00:00.000Z",
          hora: "20:00",
          sala: "000000000000000000000001"
        },
        {
          id: 4,
          fecha: "2024-12-12T00:00:00.000Z",
          hora: "15:00",
          sala: "000000000000000000000002"
        },
        {
          id: 5,
          fecha: "2024-12-12T00:00:00.000Z",
          hora: "18:00",
          sala: "000000000000000000000002"
        }
      ],
      diaSeleccionado: null
    };
  },
  computed: {
    funcionesFiltradas() {
      const hoy = new Date();
      return this.funciones.filter(funcion => {
        const fechaFuncion = new Date(funcion.fecha);
        return fechaFuncion >= hoy; // Filtrar funciones que no han pasado
      });
    },
    diasDisponibles() {
      const dias = [...new Set(this.funcionesFiltradas.map(f => f.fecha))]; // Obtener días únicos con funciones
      return dias.map(fecha => {
        const date = new Date(fecha);
        return {
          fecha,
          nombreDia: this.obtenerNombreDia(fecha),
          numeroDia: date.getDate()
        };
      });
    },
    horariosDelDiaSeleccionado() {
      if (!this.diaSeleccionado) return [];
      return this.funcionesFiltradas
        .filter(f => f.fecha === this.diaSeleccionado)
        .map(f => f.hora);
    }
  },
  methods: {
    seleccionarDia(fecha) {
      this.diaSeleccionado = fecha;
    },
    obtenerNombreDia(fecha) {
      const dias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return dias[new Date(fecha).getDay()];
    }
  },
  mounted() {
    // Seleccionar automáticamente el día más cercano a la fecha actual
    if (this.diasDisponibles.length > 0) {
      this.diaSeleccionado = this.diasDisponibles[0].fecha;
    }
  }
};
</script>

<style scoped>
.dias button {
  margin-right: 10px;
  margin-bottom: 10px;
}
.dias button.active {
  background-color: #007bff;
  color: white;
}
.horarios button {
  margin-right: 10px;
}
</style>
