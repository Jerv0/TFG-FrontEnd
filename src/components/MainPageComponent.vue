<script setup lang="ts">
import { ref } from 'vue';
import { store } from '../store/store';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';

const CUIDADOR = process.env.CUIDADOR;
const PACIENTE = process.env.PACIENTE;

const showForm = ref<boolean>(false);

const openForm = (typeP: string) => {
  store.type = typeP;
  showForm.value = true;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <DrawerAppBar />
    <q-page-container>
      <q-page class="page-content">
        <div class="content-wrapper">
          <div class="content-box">
            <h3>Bienvenidos</h3>
            <q-btn
              class="full-width button-margin"
              color="primary"
              label="Ya tengo cuenta"
              to="/Login"
            />

            <q-btn
              class="full-width button-margin"
              color="accent"
              label="Registro de supervisor"
              @click="openForm(CUIDADOR)"
              to="/Register"
            />

            <q-btn
              class="full-width button-margin"
              color="accent"
              label="Registro de paciente"
              @click="openForm(PACIENTE)"
              to="/Register"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

h3{
margin-top: 2px;
font-family: Georgia, 'Times New Roman', Times, serif;
font-size: 40px;
}

.page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/holaa.webp');

}

.content-wrapper {
  max-width: 400px;
  padding: 20px;
  /* background-color: #e7c39a; */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid black;
}

.content-box {
  text-align: center;
}

.full-width {
  width: 100%;
}

.button-margin {
  margin-bottom: 12px;
}
</style>
