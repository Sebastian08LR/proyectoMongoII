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
        :key="horario.id"
        @click="seleccionarHorario(horario)"
        :class="{ active: horarioSeleccionado?.id === horario.id }"
      >
        <h2>{{ horario.hora }}</h2>
        <p>$ 5.99</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useSeatsStore } from '../store/reservationStore.js';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const seatsStore = useSeatsStore();
    const { diaSeleccionado, horarioSeleccionado, diasUnicos, horariosDelDiaSeleccionado } = storeToRefs(seatsStore);

    const { seleccionarDia, seleccionarHorario } = seatsStore;

    return {
      diaSeleccionado,
      horarioSeleccionado,
      diasUnicos,
      horariosDelDiaSeleccionado,
      seleccionarDia,
      seleccionarHorario
    };
  },
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
