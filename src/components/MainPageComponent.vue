<script setup lang="ts">
// IMPORTS
import { ref } from 'vue';
import FormCuidadorComponent from './FormComponent.vue';

//VARIABLES GLOBALES
const cuidador = process.env.CUIDADOR;
const persona = process.env.PERSONA;
//VARIABLES DEL COMPONENTE
const showForm = ref<boolean>(true);
const type = ref<string>('');

//METODOS
const openForm = (typeP: string) => {
    type.value = typeP;
    showForm.value = true;
};

const closeForm = () => {
    showForm.value = false;
};
</script>

<template>
    <FormCuidadorComponent v-if="showForm" :showForm="showForm" :type="type" @closeForm="closeForm" />
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Cuidador" icon="" @click="openForm(cuidador)" />
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Persona" icon="" @click="openForm(persona)" />
    {{ showForm }}
</template>

<style></style>
