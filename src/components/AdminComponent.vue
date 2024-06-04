<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CardComponent from './CardComponent.vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import ChatComponent from './ChatComponent.vue';
import CloseSession from './CloseSessionComponent.vue';

const count = ref<number | null>(null);

const fetchUsersCount = async () => {
    try {
        const response = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi`);
        count.value = response.data.usuarios.length;
    } catch (error) {
        console.error('Error fetching user count:', error);
    }
};

onMounted(fetchUsersCount);
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar />
        <q-page-container>
            <q-page class="q-pa-md">
                <CloseSession />
                <div class="row q-gutter-md">
                    <div class="col-12 col-md-6 col-lg-4">
                        <ChatComponent />
                    </div>
                    <div class="col-12 col-md-6 col-lg-4">
                        <CardComponent title="Usuarios" subtitle="Total de usuarios" :count="count" color="pink-8" />
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
