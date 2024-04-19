<script  setup lang="ts">
import { ref } from 'vue';
import routes from 'src/router/routes';

//Esto lo hago para quitar la ultima posicion y que no salga la ruta de /:catchAll(.*)*
routes.pop();
const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false); //CAMBIAR A FALSE UNA VEZ TERMINADO DE ARREGLAR ESTA PARTE

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
let model1 = ref<string>('2024-04-18')
let model2 = ref<string>('03-21-2024')
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
                    <div class="text-weight-bold">Razvan Stoenescu</div>
                    <div>@rstoenescu</div> 
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
            <div class="q-pa-md">
                <div class="q-gutter-md row items-start">
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                        <q-badge color="teal">
                            Model: {{ model1 }}
                        </q-badge>
                        <q-badge color="purple" text-color="white">
                            Mask: YYYY-MM-DD
                        </q-badge>
                        </div>

                        <q-date v-model="model1" mask="YYYY-MM-DD" />
                    </div>
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                        <q-badge color="teal">
                            Model: {{ model2 }}
                        </q-badge>
                        <q-badge color="purple" text-color="white">
                            Mask: MM-DD-YYYY
                        </q-badge>
                        </div>
                        <q-date v-model="model2" mask="MM-DD-YYYY" />
                    </div>
                </div>
            </div>
            
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" to="/conversacion/id" />
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" />
        </q-page-container>
    </q-layout>
</template>

<style scoped>

</style>