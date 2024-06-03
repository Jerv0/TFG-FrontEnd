<script setup lang="ts">
import ChatComponent from './ChatComponent.vue';
import CalendarComponent from './CalendarComponent.vue';
import { store } from '../store/store';
import { ref } from 'vue';

let data: any = store.getCookie('userData');
const mes = ref(5)
const anio = ref(2024)
 
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <p>{{ "id paciente: "+ data.id_usuario }}</p>
            <div>Pantalla principal
                <input type="number" v-model="mes" min="1" max="12"/>
                <input type="number" v-model="anio" min="2000" max="2050"/>
            </div>

            <CalendarComponent :mes="mes" :anio="anio" :id_usuario="data.id_usuario"/>
            <!-- Importar frases aleatorias -->
            <ChatComponent/>
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" />
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.large-calendar {
  width: 700px; /* Ancho personalizado */
  height: 500px; /* Altura personalizada */
}
</style>
