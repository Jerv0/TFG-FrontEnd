<script setup lang="ts">
import { ref } from 'vue';
import DrawerAppBar from 'src/layouts/DrawerAppBar.vue';
//Esto lo hago para quitar la ultima posicion y que no salga la ruta de /:catchAll(.*)*

let model1 = ref<string>('2024-04-18');
let model2 = ref<string>('03-21-2024');
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar ver="admin" />

        <q-page-container>
            <div class="q-pa-md">
                <div class="q-gutter-md row items-start">
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                            <q-badge color="teal"> Model: {{ model1 }} </q-badge>
                            <q-badge color="purple" text-color="white"> Mask: YYYY-MM-DD </q-badge>
                        </div>

                        <q-date v-model="model1" mask="YYYY-MM-DD" />
                    </div>
                    <div>
                        <div class="q-pb-sm q-gutter-sm">
                            <q-badge color="teal"> Model: {{ model2 }} </q-badge>
                            <q-badge color="purple" text-color="white"> Mask: MM-DD-YYYY </q-badge>
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

<style scoped></style>
