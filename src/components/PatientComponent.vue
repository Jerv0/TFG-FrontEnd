<script setup lang="ts">
import { ref } from 'vue';
import DrawerAppBar from 'src/layouts/DrawerAppBar.vue';
import ChatComponent from './ChatComponent.vue';
import { store } from '../store/store';

//Esto lo hago para quitar la ultima posicion y que no salga la ruta de /:catchAll(.*)*

let model1 = ref<string>('2024-04-18');
const frases = [
  'Cada día que te enfrentas a este desafío, eres un recordatorio viviente de la fortaleza humana. Estamos contigo en este viaje.',
  'Tu positividad en medio de la adversidad es una luz brillante. Sigues irradiando esperanza incluso en los momentos más difíciles.',
  'Tu coraje es un testimonio de tu increíble fuerza interior. Estamos ansiosos por ver cómo floreces después de superar este obstáculo.',
  'En cada día de lucha, encuentras una reserva de valentía que inspira a todos a tu alrededor.',
  'La primavera sigue al invierno, y en tu viaje, cada día nos acerca más a la renovación. Pronto florecerás en una nueva etapa de vida.',
  'La resiliencia es tu superpoder. Sigues adelante con gracia y valentía, y eso te llevará a la victoria.',
  'Cada pequeño paso hacia adelante es una victoria sobre la enfermedad. Estás construyendo tu camino hacia la salud día a día.',
];

const indiceAleatorio = Math.floor(Math.random() * frases.length);
const elementoAleatorio = frases[indiceAleatorio];
const data: any = store.getCookie('userData');

 
</script>

<template>
    <q-layout view="hHh lpR fFf">
       

        <q-page-container>
            <div class="q-pa-md">
                <div class="q-gutter-md row items-start">
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                            <q-badge color="teal"> Model: {{ model1 }} </q-badge>
                            <q-badge color="purple" text-color="white"> {{data}} </q-badge>
                        </div>

                        <q-date v-model="model1" mask="YYYY-MM-DD" class="large-calendar" />                    
                    </div>
                    <q-card flat bordered class="bg-cyan-8" style="max-width: 500px; color: white; height: 150px; position: absolute; top: 20px; right: 0;">
                        <q-card-section> 
                        <div class="text-h6"><q-icon name="star"/> Recuerda: </div> 
                        </q-card-section>
                        <q-card-section>
                        {{ elementoAleatorio }}
                        </q-card-section>
                    </q-card> 
                 
                </div>
            </div>
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
