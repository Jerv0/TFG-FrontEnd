<script setup lang="ts">
import { ref } from 'vue';
import DarkModeComponent from '../components/DarkModeComponent.vue';
const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false); //CAMBIAR A FALSE UNA VEZ TERMINADO DE ARREGLAR ESTA PARTE

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

defineOptions({
    name: 'MainLayout',
});

const props = defineProps<{
    ver: string;
}>();
</script>

<template>
    <q-header elevated>
        <q-toolbar>
            <q-toolbar-title> {{ TITLE }} </q-toolbar-title>
            <DarkModeComponent />
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
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
            <q-list padding v-if="props.ver === 'admin'">
                <!-- Aqui tiene que cambiar el 1 por el propio perfil del admin -->
                <q-item-label header> Informacion </q-item-label>
                <q-item clickable v-ripple to="/admin" active-class="my-menu-link"><q-item-section> Inicio </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/candidato" active-class="my-menu-link"><q-item-section> Candidatos </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/paciente" active-class="my-menu-link"><q-item-section> Pacientes </q-item-section> </q-item>
                <q-item clickable v-ripple to="/ver/supervisor" active-class="my-menu-link"><q-item-section> Supervisor </q-item-section> </q-item>
                <!-- <q-item v-for="(route, index) in routes" :key="index" clickable v-ripple :to="route.path" active-class="my-menu-link">
                    <q-item-section avatar>
                        <q-icon :name="route.icon" />
                    </q-item-section>
                    <q-item-section> {{ route.title }} </q-item-section>
                </q-item> -->
            </q-list>
            <q-separator spaced />
        </q-scroll-area>
    </q-drawer>
</template>

<style>
.my-menu-link {
    color: white;
    background-color: #f2c037;
}

#hola {
    border: 1px solid #000;
}
</style>
