<script setup lang="ts">
import { ref } from 'vue';
import routes from 'src/router/routes';

//Esto lo hago para quitar la ultima posicion y que no salga la ruta de /:catchAll(.*)*
routes.pop();
const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false); 

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

defineOptions({
    name: 'MainLayout',
});
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title> {{ TITLE }} </q-toolbar-title>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <!-- Esto se tendria que actualizar con la foto , nombre , etc... de cuando este registrado el usuario -->
            <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px"/>
            <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                <q-list padding>
                    <!--para que solo aparezcan los primeros 3 elementos del array routes que son los que interesan para esta vista-->
                    <q-item v-for="(route, index) in routes.slice(0, 3)" :key="index" clickable v-ripple :to="route.path" active-class="my-menu-link">
                        <q-item-section avatar>
                            <q-icon :name="route.icon" />
                        </q-item-section>
                        <q-item-section> {{ route.title}} </q-item-section>
                    </q-item>
                </q-list>
                <q-separator spaced />
            </q-scroll-area>
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

#hola{
    border: 1px solid #000;
}
</style>
