<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import CloseSession from '../components/CloseSessionComponent.vue';
import { store } from '../store/store';
const data: any = store.getCookie('userData');

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <q-page class="q-pa-md flex flex-center">
                <q-card class="q-pa-lg my-card bg-primary text-white">
                    <q-card-section class="text-center">
                        <div class="text-h5 q-mb-md">Bienvenido {{ data.nombre }}</div>
                        <div class="q-mt-md">Tu cuenta de supervisor está actualmente a la espera de confirmación para poder acceder a la plataforma</div>

                        <CloseSession v-if="store.getCookie('userData')" />
                    </q-card-section>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style lang="scss" scoped>
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.my-card {
    max-width: 400px;
    width: 100%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
</style>
