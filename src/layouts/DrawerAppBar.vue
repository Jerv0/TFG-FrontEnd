<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { ref } from 'vue';
import DarkModeComponent from '../components/DarkModeComponent.vue';
import CloseSession from '../components/CloseSessionComponent.vue';
import Chat from '../components/ChatComponent.vue';


const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false); //CAMBIAR A FALSE UNA VEZ TERMINADO DE ARREGLAR ESTA PARTE

import { store } from '../store/store';
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

defineOptions({
    name: 'MainLayout',
});

const prueba: any = store.getCookie('userData') || null;
</script>

<template>
    <q-header elevated>
        <q-toolbar class="q-pa-md justify-between">
            <q-toolbar-title class="text-center"> {{ TITLE }} </q-toolbar-title>
            <div class="row items-center justify-center offset-left">
                <Chat/>
                <DarkModeComponent />
                <q-btn color="secondary" dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
            </div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <!-- Esto se tendria que actualizar con la foto , nombre , etc... de cuando este registrado el usuario -->
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <!-- <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                    <div class="text-weight-bold">Razvan Stoenescu</div>
                    <div>@rstoenescu</div>  -->
            </div>
        </q-img>

        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <!-- MENU PARA ADMIN O LO QUE SEA -->
            <q-list padding v-if="prueba?.usertype === 'admin'">
                <!-- Aqui tiene que cambiar el 1 por el propio perfil del admin -->

                <q-item-label header> Informacion </q-item-label>
                <q-item clickable v-ripple to="/admin" active-class="my-menu-link"><q-item-section> Inicio </q-item-section> </q-item>
                <q-item clickable v-ripple to="/candidaturas" active-class="my-menu-link"><q-item-section> Candidatos </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/paciente" active-class="my-menu-link"><q-item-section> Pacientes </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/supervisor" active-class="my-menu-link"><q-item-section> Supervisor </q-item-section> </q-item>
            </q-list>
            
            <q-separator spaced />

            <CloseSession v-if="store.getCookie('userData')" />
        </q-scroll-area>
        
    </q-drawer>
</template>

<style scoped lang="scss">

@import '../assets/variables.scss';
.my-menu-link {
    color: white;
    background-color: $secondary;
}
.offset-left {
    margin-right: auto;
    padding-right: 70px; /* Ajusta este valor según tus necesidades */
}
</style>
