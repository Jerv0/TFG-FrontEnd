<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import ChatComponent from './ChatComponent.vue';
import CalendarComponent from './CalendarComponent.vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { store } from '../store/store';
import { ref } from 'vue';

const data: any = store.getCookie('userData') || null;

const mes = ref<number>(3);
const anio = ref<number>(2024);

const meses = <string[]>[
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const cambiarMes = (incremento: number) => {
  mes.value += incremento;
  if (mes.value < 1) {
    mes.value = 12;
    anio.value--;
  } else if (mes.value > 12) {
    mes.value = 1;
    anio.value++;
  }
};

const cambiarAnio = (incremento: number) => {
  anio.value += incremento;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <DrawerAppBar />
    <q-page-container>
      <p>{{ "id paciente: " + data.id_usuario }}</p>
      <div class="datos">
        <div class="contain">
          <div class="select">
            <button class="flechaAnio" @click="cambiarAnio(-1)">
              &lt;&lt;
            </button>
            <button class="flecha" @click="cambiarMes(-1)">←</button>
            <select v-model="mes" class="option">
              <option
                v-for="(month, index) in meses"
                :value="index + 1"
                :key="index"
              >
                {{ month }}
              </option>
            </select>
          </div>
          <div class="select">
            <input
              class="option"
              type="number"
              v-model="anio"
              min="2000"
              max="2050"
            />
            <button class="flecha" @click="cambiarMes(1)">→</button>
            <button class="flechaAnio" @click="cambiarAnio(1)">&gt;&gt;</button>
          </div>
        </div>
      </div>

      <CalendarComponent
        :mes="mes"
        :anio="anio"
        :id_usuario="data.id_usuario"
      />
      <!-- Importar frases aleatorias -->
      <ChatComponent />
      <q-btn
        align="between"
        class="btn-fixed-width"
        color="accent"
        label="Cerrar sesión"
        to="/"
      />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.large-calendar {
  width: 700px; /* Ancho personalizado */
  height: 500px; /* Altura personalizada */
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

header{
    background: #0575E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #021B79, #0575E6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #021B79, #0575E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#contenedor{
    background-color: #D4F3E0 ;
}

h1 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    height: 65px;
    width: 100%;
    font-weight: bold;
    font-size: 2.5em;
    color: #f0f0f0; 
    text-align: center;
}

.datos {
    display: flex;
    flex-direction: column;
    align-items: center;
}
  
.contain {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}
  
.select {
    margin-bottom: 10px;
    margin-right: 20px;
}
  
.option {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    width: 200px;
    color: #555; /* Color del texto */
}

.option:hover {
    border-color: #999;
}
  
.option:focus {
    outline: none;
    border-color: #007bff;
}

.flecha{
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    margin-left: 14px;
    margin-right: 14px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.flecha:hover {
    background-color: #45a049;
}

.flechaAnio{
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    margin-left: 45px;
    margin-right: 45px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}


</style>
