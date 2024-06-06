<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { store } from '../store/store';
import CardComponent from './CardComponent.vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import ChatComponent from './ChatComponent.vue';
import CloseSession from './CloseSessionComponent.vue';
const urls = [
    `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}`,
    `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=paciente`,
    `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=supervisor&activado=0`,
    `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=supervisor&activado=1`,
];

const datosCards = ref([
    { title: 'Usuarios', subtitle: 'Total de usuarios', count: 0, color: 'primary', url: '' },
    { title: 'Pacientes', subtitle: 'Total de pacientes', count: 0, color: 'secondary', url: 'ver/paciente' },
    { title: 'Candidatos', subtitle: 'Total de candidatos', count: 0, color: 'primary', url: 'candidaturas' },
    { title: 'Supervisores activos', subtitle: 'Total de supervisores', count: 0, color: 'secondary', url: 'ver/supervisor' },
]);

const fillCards = async () => {
    await Promise.all(
        datosCards.value.map(async (el, index) => {
            el.count = await store.fetchCount(urls[index]);
        })
    );
};

fillCards();
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar />
        <q-page-container>
            <q-page class="q-pa-md">
                <!-- <CloseSession /> -->
                <!-- <ChatComponent /> -->
                <div class="row q-gutter-md">
                    <!-- Sección de tarjetas de información -->
                    <div class="col-12 col-md-6 col-lg-8">
                        <div class="row q-gutter-md">
                            <CardComponent v-for="card in datosCards" :key="card.title" :title="card.title" :subtitle="card.subtitle" :count="card.count" :url="card.url" :color="card.color" />
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
body {
    background-color: var(--bg);
    color: var(--color);
    transition: background-color 0.3s, color 0.3s;
}

.row {
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px; /* Improved spacing between elements */
}

.col-12 {
    flex: 1 0 100%;
}

.col-md-6 {
    flex: 0 0 48%;
    max-width: 48%;
}

.col-lg-4 {
    flex: 0 0 32%;
    max-width: 32%;
}
</style>
