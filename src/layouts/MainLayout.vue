<script setup lang="ts">
import { ref } from 'vue';
import routes from 'src/router/routes';

//Esto lo hago para quitar la ultima posicion y que no salga la ruta de /:catchAll(.*)*
routes.pop();
const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false); //CAMBIAR A FALSE UNA VEZ TERMINADO DE ARREGLAR ESTA PARTE

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

defineOptions({
    name: 'MainLayout',
});
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> {{ TITLE }} </q-toolbar-title>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <!-- Esto se tendria que actualizar con la foto , nombre , etc... de cuando este registrado el usuario -->
            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="56px" class="q-mb-sm">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                    </q-avatar>
                    <div class="text-weight-bold">Razvan Stoenescu</div>
                    <div>@rstoenescu</div>
                </div>
            </q-img>
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item v-for="(route, index) in routes" :key="index" clickable v-ripple :to="route.path" active-class="my-menu-link">
                        <q-item-section avatar>
                            <q-icon :name="route.icon" />
                        </q-item-section>
                        <q-item-section> {{ route.title }} </q-item-section>
                    </q-item>
                </q-list>
                <q-separator spaced />
            </q-scroll-area>
            <!-- <q-list>
                <q-item-label header> Menu </q-item-label>

                <q-item-label v-for="(route, index) in routes" :key="index">
                    <RouterLink class="prueba" :to="route.path"> {{ route.children![0].name }} </RouterLink>
                </q-item-label>
            </q-list> -->
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style>
.my-menu-link {
    color: white;
    background-color: #f2c037;
}
</style>
