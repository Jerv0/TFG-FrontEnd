<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

const Login = () => {
    const data = {
        email: email.value,
        password: password.value,
    };

    /**esto es para imitar el sistema de autenticación hasta que lo arreglemos para que podamos ver las vistas. */
    if (!email.value || !password.value) {
        alert('rellene los datos correctamente');
    } else if (email.value === 'paciente' && password.value === 'paciente') {
        router.push('/paciente/id');
    } else if (email.value === 'supervisor' && password.value === 'supervisor') {
        router.push('/supervisor/id');
    } else if (email.value === 'admin' && password.value === 'admin') {
        router.push('/admin/id');
    } else {
        alert('email o contraseña incorrectos');
    }
    console.log(data);
};
</script>

<template>
    <div>
        <q-layout view="hHh lpR fFf">
            <q-page-container>
                <DrawerAppBar ver="login" />
                <q-input filled type="email" v-model="email" label="Email *" />
                <q-input type="password" v-model="password" label=" Password *" />
                <q-btn align="between" class="btn-fixed-width" color="accent" label="Iniciar sesión" @click="Login" />
                <q-btn align="between" class="btn-fixed-width" color="accent" label="Cancelar" to="/" />
            </q-page-container>
        </q-layout>
    </div>
</template>

<style scoped></style>
