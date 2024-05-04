<script  setup lang="ts">
import { ref } from 'vue';
import routes from 'src/router/routes';

//Esto lo hago para quitar la ultima posicion y que no salga la ruta de /:catchAll(.*)*
routes.pop();

let model1 = ref<string>('2024-04-18')
let model2 = ref<string>('03-21-2024')

const frases = [
    'Cada día que te enfrentas a este desafío, eres un recordatorio viviente de la fortaleza humana. Estamos contigo en este viaje.',
    'Tu positividad en medio de la adversidad es una luz brillante. Sigues irradiando esperanza incluso en los momentos más difíciles.',
    'Tu coraje es un testimonio de tu increíble fuerza interior. Estamos ansiosos por ver cómo floreces después de superar este obstáculo',
    'En cada día de lucha, encuentras una reserva de valentía que inspira a todos a tu alrededor.',
    'La primavera sigue al invierno, y en tu viaje, cada día nos acerca más a la renovación. Pronto florecerás en una nueva etapa de vida.',
    'La resiliencia es tu superpoder. Sigues adelante con gracia y valentía, y eso te llevará a la victoria.',
    'Cada pequeño paso hacia adelante es una victoria sobre la enfermedad. Estás construyendo tu camino hacia la salud día a día.',
]

const indiceAleatorio = Math.floor(Math.random() * frases.length);
const elementoAleatorio = frases[indiceAleatorio];
const tab = ref<string>('mails');

</script>

<template>
       <q-layout view="hHh lpR fFf">
        <q-page-container>
            <div class="q-pa-md">
                <div class="q-gutter-md row items-start">
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                            <q-badge color="teal">
                                Model: {{ model1 }}
                            </q-badge>
                            <q-badge color="purple" text-color="white">
                                Mask: YYYY-MM-DD
                            </q-badge>
                        </div>

                        <q-date v-model="model1" mask="YYYY-MM-DD" />
                    </div>
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                        <q-badge color="teal">
                            Model: {{ model2 }}
                        </q-badge>
                        <q-badge color="purple" text-color="white">
                            Mask: MM-DD-YYYY
                        </q-badge>
                        </div>
                        <q-date v-model="model2" mask="MM-DD-YYYY" />
                    </div>
                    <!--card con frase-->
                    <q-card flat bordered class="bg-cyan-8" style="max-width: 500px; color: white; height: 150px; position: absolute; top: 0; right: 0;">
                        <q-card-section> 
                            <div class="text-h6"><q-icon name="star"/> Recuerda: </div> 
                        </q-card-section>
                        <q-card-section>
                        {{elementoAleatorio}}
                        </q-card-section>
                    </q-card>
                    
                </div>
              
            </div>
            <div id="tab" class="q-gutter-y-md" style="max-width: 600px">
                    <q-tabs
                        v-model="tab"
                        inline-label
                        class="bg-purple text-white shadow-2"
                    >
                        <q-tab name="calendar" icon="calendar_today" label="Calendario" />
                        <q-tab name="recordatorio" icon="alarm" label="Citas" />
                    </q-tabs>
            </div>
           <!--  <div class=" q-mb-md q-mr-md">
                <q-btn class="glossy" round color="deep-orange" icon="chat" />
            </div> --> 
        </q-page-container>
    </q-layout>
   
</template>

<style scoped>

</style>
