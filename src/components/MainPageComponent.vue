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
        <DrawerAppBar  />
        <q-page-container>
            <q-page padding>
                <div class="q-pa-md q-gutter-md text-center">
                    <h3>Bienvenido a nuestra página web</h3>
                    <p class="text-subtitle2 q-mb-lg">Por favor selecciona una opcion.</p>

                    <q-btn class="full-width q-mb-sm" color="primary" label="Ya tengo cuenta" to="/Login" />

                    <q-btn class="full-width q-mb-sm" color="accent" label="Registro de supervisor" @click="openForm(CUIDADOR)" to="/Register" />

                    <q-btn class="full-width q-mb-sm" color="accent" label="Registro de paciente" @click="openForm(PACIENTE)" to="/Register" />

                    <p class="text-caption text-grey-6 q-mt-md">texto guapo</p>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.full-width {
    width: 100%;
}
.text-center {
    text-align: center;
}
.text-caption {
    font-size: 0.75rem;
}
.q-mb-sm {
    margin-bottom: 8px;
}
.q-mb-lg {
    margin-bottom: 16px;
}
.q-mt-md {
    margin-top: 16px;
}
.q-pa-md {
    padding: 16px;
}
.q-gutter-md > * {
    margin: 8px;
}
</style>
