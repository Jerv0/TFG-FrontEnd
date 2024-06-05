<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import ChatComponent from './ChatComponent.vue';
import CalendarComponent from './CalendarComponent.vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { store } from '../store/store';
import { ref } from 'vue';

const data: any = store.getCookie('userData') || null;

const mes = ref<number>(5);
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


</script>

<template>
  <q-layout view="hHh lpR fFf">
    <DrawerAppBar />
    <q-page-container>
      <!-- <p>{{ "id paciente: " + data.id_usuario }}</p> -->
      <div class="datos">
        <div class="contain">
          <div class="select">
            <button class="flecha" @click="cambiarMes(-1)">←</button>
            <input class="option" type="string" v-model="meses[mes - 1]" readonly>
          </div>
          <div>
            <button class="flecha" @click="cambiarMes(1)">→</button>
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
    border: 1px solid #c87531;
    border-radius: 5px;
    background-color: #fff;
    width: 105px;
    color: #555; /* Color del texto */
    text-align: center;
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
    background-color: #ff651d;
    margin-left: 25px;
    margin-right: 25px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.flecha:hover {
    background-color:  #ff651d;
}

.flechaAnio{
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #ff651d;
    margin-left: 45px;
    margin-right: 45px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}


</style>
