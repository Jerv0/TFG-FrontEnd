<script setup lang="ts">
// IMPORTS
import { ref } from 'vue';
import { uid } from 'quasar';
import { store } from '../store/store';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
//VARIABLES GLOBALES
const CUIDADOR = process.env.CUIDADOR;
const PACIENTE = process.env.PACIENTE;

//VARIABLES DEL COMPONENTE
const showForm = ref<boolean>(false);
const id = ref<string>(uid());

//METODOS
const openForm = (typeP: string) => {
    store.type = typeP;
    showForm.value = true;
};
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <DrawerAppBar ver="" />
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Ya tengo cuenta" icon="" to="/Login" />
            <h3>Bienvenido a nuestra página web</h3>
            <p>{{ id }}</p>
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Soy supervisor" icon="" @click="openForm(CUIDADOR)" to="/Register" />
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Soy paciente" icon="" @click="openForm(PACIENTE)" to="/Register" />
        </q-page-container>
    </q-layout>
</template>

<style></style>
