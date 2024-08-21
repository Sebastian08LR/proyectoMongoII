<template>
  <div class="functionsContainer">
    <div class="dias">
      <div
        v-for="dia in diasUnicos"
        :key="dia.fecha"
        @click="seleccionarDia(dia.fecha)"
        :class="{ active: diaSeleccionado === dia.fecha }"
      >
        <p>{{ dia.nombreDia }}</p>
        <h2>{{ dia.numeroDia }}</h2>
      </div>
    </div>
    <div class="horarios" v-if="diaSeleccionado">
      <div
        v-for="horario in horariosDelDiaSeleccionado"
        :key="horario"
        @click="seleccionarHorario(horario)"
        :class="{ active: horarioSeleccionado === horario }"
      >
        <h2>{{ horario }}</h2>
        <p>$ 5.99</p>
      </div>
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
          fecha: "2024-11-10T19:00:00.000Z",
          hora: "14:00",
          sala: "000000000000000000000001"
        },
        {
          id: 2,
          fecha: "2024-11-10T22:00:00.000Z",
          hora: "17:00",
          sala: "000000000000000000000001"
        },
        {
          id: 3,
          fecha: "2024-11-10T22:00:00.000Z",
          hora: "20:00",
          sala: "000000000000000000000001"
        },
        {
          id: 4,
          fecha: "2024-12-11T20:00:00.000Z",
          hora: "15:00",
          sala: "000000000000000000000002"
        },
        {
          id: 5,
          fecha: "2024-12-11T23:00:00.000Z",
          hora: "18:00",
          sala: "000000000000000000000002"
        }
      ],
      diaSeleccionado: null,
      horarioSeleccionado: null
    };
  },
  computed: {
    funcionesFiltradas() {
      const hoy = new Date();
      console.log(hoy)
      console.log(hoy.getUTCHours())
      return this.funciones.filter(funcion => {
        const fechaFuncion = new Date(funcion.fecha);
        console.log(fechaFuncion)
        console.log(fechaFuncion.getUTCHours())
        return fechaFuncion >= hoy; // Filtrar funciones que no han pasado
      });
    },
    diasUnicos() {
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
    horariosDelDiaSeleccionado() {
      if (!this.diaSeleccionado) return [];
      return this.funcionesFiltradas
        .filter(f => f.fecha.slice(0, 10) === this.diaSeleccionado)
        .map(f => f.hora);
    }
  },
  methods: {
    seleccionarDia(fecha) {
      this.diaSeleccionado = fecha;
      const horarios = this.horariosDelDiaSeleccionado;
      if (horarios.length > 0) {
        this.horarioSeleccionado = horarios[0]; // Seleccionar automáticamente el primer horario
      }
    },
    seleccionarHorario(horario) {
      this.horarioSeleccionado = horario;
    },
    obtenerNombreDia(fecha) {
      const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return dias[new Date(fecha).getDay()];
    }
  },
  mounted() {
    // Seleccionar automáticamente el día más cercano a la fecha actual
    if (this.diasUnicos.length > 0) {
      this.seleccionarDia(this.diasUnicos[0].fecha);
    }
  }
};
</script>

<style scoped>
.functionsContainer {
  margin-top: 25px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 48px;
}

.dias {
  display: flex;
}
.dias div {
  height: 78px;
  width: 54px;
  margin-right: 16px;
  margin-bottom: 27px;
  overflow: hidden;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  color: black;
  cursor: pointer;
  transition: background-color 0.5s, color 0.3s;
}

.dias div p {
  margin: 0;
  margin-top: 12px;
  font-size: 14px;
}

.dias div h2 {
  margin: 0;
  font-size: 24px;
}

.dias div.active {
  background-color: red;
  color: white;
  border-radius: 6px;
}

.horarios{
  display: flex;
}
.horarios div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 62px;
  margin-right: 18px;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.5s, color 0.3s;
}
.horarios div h2{
  margin: 0;
  font-size: 20px;
}

.horarios div p {
  margin: 0;
  font-size: 13px;
}

.horarios div.active {
  background-color: red;
  color: white;
  border-radius: 6px;
}
</style>
