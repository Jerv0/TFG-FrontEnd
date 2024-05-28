<script setup lang="ts">
import CardComponent from './CardComponent.vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import ChatComponent from './ChatComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import logoutButton from './CloseSessionComponent.vue';

const count = ref<number | null>(null);

const usersCount = async () => {
    try {
        const response = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?`);
        count.value = response.data.usuarios.length;
    } catch (e) {
        console.log(e);
    }
};

onMounted(() => {
    usersCount();
});
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar />
        <q-page-container>
            <q-page class="q-pa-md">
                <logoutButton class="q-mb-md" />
                <ChatComponent />
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6 col-lg-4 q-mb-md">
                        <CardComponent title="Usuarios" subtitle="Total de usuarios" :count="count" color="pink-8" />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
:root {
    --bg: #fff;
    --color: #333333;
}

html.dark-mode {
    --bg: #232b32;
    --color: #ddd8ca;
}

body {
    background-color: var(--bg);
    color: var(--color);
    transition: background-color 0.3s, color 0.3s; /* Transición suave para los cambios de tema */
}

/* Clases de utilidad para bordes redondeados y sombras */
.rounded-borders {
    border-radius: 8px;
}

.shadow-2 {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Aseguramos que el contenedor de la tarjeta esté bien espaciado y centrado */
.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.col-12 {
    padding: 16px;
}

.bg-white {
    background-color: var(--bg);
}

.text-center {
    text-align: center;
}
</style>
