<script setup lang="ts">
// IMPORTS
import { ref } from 'vue';
import { uid } from 'quasar';
import FormComponent from './FormComponent.vue';

//VARIABLES GLOBALES
const CUIDADOR = process.env.CUIDADOR;
const PACIENTE = process.env.PACIENTE;
//VARIABLES DEL COMPONENTE
const showForm = ref<boolean>(true); //CAMBIAR A FALSE PARA QUE NO SALGA EL FORMULARIO CARGADO
const type = ref<string>('');
const id = ref<string>(uid());
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
    id Generado: {{ id }}
    <FormComponent v-if="showForm" :showForm="showForm" :type="type" @closeForm="closeForm" />
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Cuidador" icon="" @click="openForm(CUIDADOR)" />
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Persona" icon="" @click="openForm(PACIENTE)" />
    {{ showForm }}
</template>

<style></style>
