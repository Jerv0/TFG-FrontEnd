<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import toast from '../utils/formatNotify';
import { store } from '../store/store';

import DrawerAppBar from '../layouts/DrawerAppBar.vue';

const router = useRouter();
const email = ref<string>('paciente1@example.com');
const password = ref<string>('pass1');
const clearFields = () => {
    email.value = '';
    password.value = '';
};

const login = async () => {
    try {
        const response = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?email=${email.value}`);

        if (response.data.usuarios.length > 0) {
            store.addCookie('userData', response.data.usuarios[0]);
            const data: any = store.getCookie('userData');
            router.push(`/${data.usertype}`);
        } else {
            clearFields();
            toast('error', 'Fallo de autentificación');
        }
    } catch (error) {
        toast('error', 'Error de conexión');
    }
};
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar />
        <q-page-container>
            <q-page class="flex flex-center">
                <div class="login-card q-pa-md q-gutter-md">
                    <h2 class="text-center">Iniciar sesión</h2>
                    <q-input filled type="email" v-model="email" label="Email *" />
                    <q-input filled type="password" v-model="password" label="Password *" />
                    <div class="q-mt-md text-center">
                        <q-btn color="primary" label="Iniciar sesión" @click="login" class="full-width" />
                        <q-btn color="secondary" label="Cancelar" to="/" class="full-width q-mt-sm" />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 16px; /* Añadido padding para mejor centrado */
    box-sizing: border-box; /* Asegura que el padding se incluya en el tamaño total */
}

.login-card {
    max-width: 400px;
    width: 100%;
    padding: 24px; /* Aumentar el padding interno */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra más pronunciada */
    border-radius: 12px; /* Bordes más redondeados */
    border: 1px solid #ddd; /* Añadido el borde */
    transition: transform 0.3s ease; /* Transición suave */
    margin: 0 auto; /* Centrando la tarjeta horizontalmente */
}

.full-width {
    width: 100%;
}

.text-center {
    text-align: center;
}

.q-mt-sm {
    margin-top: 8px;
}

.q-mt-md {
    margin-top: 16px;
}

.login-card h2 {
    font-size: 1.5rem; /* Aumentar el tamaño del texto */
    font-weight: bold; /* Hacer el texto más grueso */
}

.q-btn {
    border-radius: 24px; /* Bordes redondeados en los botones */
    font-size: 1rem; /* Aumentar tamaño del texto en los botones */
}
</style>
