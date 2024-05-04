<script setup lang="ts">
// IMPORTS
import { ref } from 'vue';
import { uid } from 'quasar';
import { store } from '../store/store'

// VARIABLES GLOBALES
const CUIDADOR = process.env.CUIDADOR;
const PACIENTE = process.env.PACIENTE;

// VARIABLES DEL COMPONENTE
const showForm = ref<boolean>(false); 
const id = ref<string>(uid());


// METODOS
const openForm = (typeP: string) => {
    store.type = typeP;
    showForm.value = true;
};
</script>

<template>
  <div class="welcome-page">
    <!-- nombre aleatorio -->
    <h3>Bienvenido a Vínculos Solidarios</h3>
    <div class="content-box">
      
      <p style="display: none;">{{ id }}</p>
      <div class="cta-buttons">
        <div class="btn-group">
          <q-btn class="btn-fixed-width" color="accent" label="Soy supervisor" icon="" @click="openForm(CUIDADOR)" to="/Register"/>
          <q-btn class="btn-fixed-width" color="accent" label="Soy paciente" icon="" @click="openForm(PACIENTE)" to="/Register" />
        </div>
        <br>
        <div class="btn-center">
          <q-btn class="btn-login" color="accent" label="Ya tengo cuenta" icon="" to="/Login"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: customfont;
  src: url(./fonts/customfont.woff);
}

.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.content-box {
  border: 2px solid #000;
  padding: 20px;
  border-radius: 8px;
  width: 70%; /* Ajusta el ancho del cuadro */
  max-width: 500px; /* Máximo ancho del cuadro */
  height: 50vh; /* Ajusta la altura del cuadro */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(198, 197, 197);
  background-image: url("../icons/vista.avif");
}

h3 {
  font-size: 50px;
  text-align: center;
  font-family: customfont;
  color: #333; /* color de texto negro */
  text-align: center; /* centrar el texto */
}

.btn-center {
  text-align: center;
}

.btn-login {
  width: auto;
  margin-bottom: 10px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
}

.btn-fixed-width {
  width: 200px;
  margin: 0 5px;
}

</style>
