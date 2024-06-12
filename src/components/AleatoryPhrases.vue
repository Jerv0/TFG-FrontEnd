<script setup lang="ts">
import { ref } from 'vue';
 

const frases = [
  'Cada día que te enfrentas a este desafío, eres un recordatorio viviente de la fortaleza humana. Estamos contigo en este viaje.',
  'Tu positividad en medio de la adversidad es una luz brillante. Sigues irradiando esperanza incluso en los momentos más difíciles.',
  'Tu coraje es un testimonio de tu increíble fuerza interior. Estamos ansiosos por ver cómo floreces después de superar este obstáculo.',
  'En cada día de lucha, encuentras una reserva de valentía que inspira a todos a tu alrededor.',
  'La primavera sigue al invierno, y en tu viaje, cada día nos acerca más a la renovación. Pronto florecerás en una nueva etapa de vida.',
  'La resiliencia es tu superpoder. Sigues adelante con gracia y valentía, y eso te llevará a la victoria.',
  'Cada pequeño paso hacia adelante es una victoria sobre la enfermedad. Estás construyendo tu camino hacia la salud día a día.',
  'Pequeños pasos en la dirección correcta pueden convertirse en el viaje de tu vida.',
  'La lucha que estás en hoy está desarrollando la fuerza que necesitas para mañana.'
];

const obtenerFraseAleatoria = () => {
  const indiceAleatorio = Math.floor(Math.random() * frases.length);
  return frases[indiceAleatorio];
};

const elementoAleatorio = ref<string>('');

const verificarYActualizarFrase = () => {
  const ultimaFrase = localStorage.getItem('ultimaFrase');
  const ultimaActualizacion = localStorage.getItem('ultimaActualizacion');

  const ahora = new Date().getTime();

  if (ultimaFrase && ultimaActualizacion) {
    const diferencia = ahora - parseInt(ultimaActualizacion);

    if (diferencia < 24 * 60 * 60 * 1000) {
      // Si no han pasado 24 horas, usamos la última frase
      elementoAleatorio.value = ultimaFrase;
      return;
    }
  }

  // Si han pasado 24 horas o no hay datos previos, generamos una nueva frase
  const nuevaFrase = obtenerFraseAleatoria();
  elementoAleatorio.value = nuevaFrase;
  localStorage.setItem('ultimaFrase', nuevaFrase);
  localStorage.setItem('ultimaActualizacion', ahora.toString());
};

// Llamamos a la función para verificar y actualizar la frase al cargar la página
verificarYActualizarFrase();
</script>

<template>
  <div class="flex-center q-pa-md">
    <q-card flat bordered class="card">
      <q-card-section class="card-header">
        <div class="text-h5 text-bold"><q-icon name="star" /> Recuerda:</div>
      </q-card-section>
      <q-card-section>
        <q-img src="../assets/motivacional.jpg" class="card-img" />
      </q-card-section>
      <q-card-section class="card-content">
        <div class="q-pa-md">{{ elementoAleatorio }}</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-ripple to="/paciente" class="boton">Volver</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(135deg, #f0b3c7 0%, #ffcccb 100%);
}

.card {
  max-width: 800px;
  color: white;
  background-color: #9e405c;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: rgba(0, 0, 0, 0.1);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 16px;
}

.card-img {
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card-content {
  font-size: 1.2em;
  line-height: 1.6em;
  color: white;
  background-color: rgba(0, 0, 0, 0.1);
}

.boton {
  background-color: #c75f79;
  margin-top: 40px;
  color: white;
}
</style>
