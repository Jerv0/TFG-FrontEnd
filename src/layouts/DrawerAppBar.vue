<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DarkModeComponent from '../components/DarkModeComponent.vue';
import CloseSession from '../components/CloseSessionComponent.vue';
import Chat from '../components/ChatComponent.vue';

const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false);

import { store } from '../store/store';

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

defineOptions({
    name: 'MainLayout',
});

const cookie: any = store.getCookie('userData') || null;

const route = useRoute();
const currentRoute = ref(route.fullPath);
</script>

<template>
    <q-header elevated>
        <q-toolbar class="q-pa-md justify-between">
            <q-toolbar-title class="text-center"> {{ TITLE }} </q-toolbar-title>
            <div class="row items-center justify-center offset-left">
                <Chat v-if="cookie" />
                <DarkModeComponent />
                <q-btn color="secondary" dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
            </div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" v-if="currentRoute != '/' && currentRoute != '/Register' && currentRoute != '/Login'" show-if-above bordered>
        <!-- Esto se tendria que actualizar con la foto , nombre , etc... de cuando este registrado el usuario -->
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px" />
        <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">{{ cookie.nombre }}</div>
            <div>@{{ cookie.username }}</div>
        </div>
    </q-drawer>

    <q-drawer v-model="leftDrawerOpen" v-if="currentRoute != '/' && currentRoute != '/Register' && currentRoute != '/Login'" show-if-above bordered>
        <!-- Esto se tendria que actualizar con el nombre , etc... de cuando este registrado el usuario -->
        <q-img class="absolute-top" src="../assets/cielo.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                    <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
                </q-avatar>
                <div class="nombre">{{ cookie.nombre }}</div>
                <div class="apellido">@{{ cookie.username }}</div>
            </div>
        </q-img>

        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <!-- MENU PARA ADMIN O LO QUE SEA -->
            <q-list padding v-if="cookie?.usertype === 'admin'">
                <q-item-label header> Informacion </q-item-label>
                <q-item clickable v-ripple to="/admin" active-class="my-menu-link"><q-item-section> Inicio </q-item-section> </q-item>
                <q-item clickable v-ripple to="/candidaturas" active-class="my-menu-link"><q-item-section> Candidatos </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/paciente" active-class="my-menu-link"><q-item-section> Pacientes </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/supervisor" active-class="my-menu-link"><q-item-section> Supervisor </q-item-section> </q-item>
                <q-item clickable v-ripple to="/">
                    <q-item-section avatar><q-icon name="logout" /></q-item-section>
                    <q-item-section v-if="store.getCookie('userData')" v-ripple to="/" active-class="my-menu-link" @click="store.removeCookie('userData')">Cerrar sesión</q-item-section>
                </q-item>
            </q-list>

            <q-list padding v-if="cookie?.usertype === 'paciente'">
                <q-item clickable v-ripple to="/paciente">
                    <q-item-section avatar>
                        <q-icon name="event" />
                    </q-item-section>

                    <q-item-section> Calendario </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="/verDatos">
                    <q-item-section avatar>
                        <q-icon name="person" />
                    </q-item-section>

                    <q-item-section> Perfil </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="/motivacion">
                    <q-item-section avatar>
                        <q-icon name="military_tech" />
                    </q-item-section>

                    <q-item-section> Para ti </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="/">
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>

                    <q-item-section v-if="store.getCookie('userData')" v-ripple to="/" active-class="my-menu-link" @click="store.removeCookie('userData')"> Cerrar sesión </q-item-section>
                </q-item>
            </q-list>
            <q-list padding v-if="cookie?.usertype === 'supervisor'">
                <q-item clickable v-ripple to="/supervisor" active-class="my-menu-link"><q-item-section> Inicio </q-item-section> </q-item>

                <q-item clickable v-ripple to="/revisionTareas" active-class="my-menu-link"><q-item-section> Revisar tareas </q-item-section> </q-item>

                <q-item clickable v-ripple to="/verDatos" active-class="my-menu-link"><q-item-section> Perfil </q-item-section> </q-item>

                <q-item clickable v-ripple to="/">
                    <q-item-section avatar><q-icon name="logout" /></q-item-section>
                    <q-item-section v-if="store.getCookie('userData')" v-ripple to="/" active-class="my-menu-link" @click="store.removeCookie('userData')">Cerrar sesión</q-item-section>
                </q-item>
            </q-list>
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

.nombre,
.apellido {
    font-weight: bold;
    color: black;
    font-size: 15px;
}
</style>
