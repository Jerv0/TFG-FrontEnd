<script  setup lang="ts">
import {ref} from 'vue'

const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false); //CAMBIAR A FALSE UNA VEZ TERMINADO DE ARREGLAR ESTA PARTE

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
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
                <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
                    <div class="absolute-bottom bg-transparent">
                        <q-avatar size="56px" class="q-mb-sm">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        </q-avatar>
                        <div class="text-weight-bold">Supervisor</div>
                        <div>@marta</div> 
                    </div>
                </q-img>
                <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                    <q-list padding>
                        <q-item active-class="my-menu-link">
                            <q-item-section> Inicio</q-item-section>
                            <q-item-section> Perfil </q-item-section>
                        </q-item>
                    </q-list>
                    <q-separator spaced />
                </q-scroll-area>

            </q-drawer>

            <q-page-container>
                <div class="q-pa-md q-gutter-sm" style="height: 80px">
                    <q-avatar
                    v-for="n in 5"
                    :key="n"
                    size="40px"
                    class="overlapping"
                    :style="`left: ${n * 25}px`"
                    >
                    
                    <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`">
                    </q-avatar>
                </div>
                <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" to="/conversacion/id" />
                <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" />
            </q-page-container>
        </q-layout>
      
</template>

<style scoped>

 

</style>