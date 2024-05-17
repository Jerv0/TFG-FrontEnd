<script setup lang="ts">
import CardComponent from './CardComponent.vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import ChatComponent from './ChatComponent.vue';


</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <DrawerAppBar ver="admin" />
            <ChatComponent />
            <div class="row">
                <CardComponent title="Usuarios Registrados" subtitle="Total de usuarios" :count="100" color="pink-8" />
                <CardComponent title="Usuarios Registrados" subtitle="Total de usuarios" :count="100" color="primary" />
                <CardComponent title="Nuevos candidatos" subtitle="" :count="100" color="accent" />
            </div>
            <div class="row">
                <div class="col">
                    <h4>Candidatos</h4>
                    <div class="q-pa-md q-gutter-sm d-flex align-center" style="height: 80px">
                        <q-avatar v-for="n in 5" :key="'candidate-' + n" size="40px" class="overlapping" :style="{ left: n * 25 + 'px' }">
                            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                        </q-avatar>
                    </div>
                </div>
                <div class="col">
                    <h4>Pacientes</h4>
                    <div class="q-pa-md q-gutter-sm d-flex align-center" style="height: 80px">
                        <q-avatar v-for="n in 5" :key="'patient-' + n" size="40px" class="overlapping" :style="{ left: n * 25 + 'px' }">
                            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                        </q-avatar>
                    </div>
                </div>
                <div class="col">
                    <h4>Pacientes</h4>
                    <div class="q-pa-md q-gutter-sm d-flex align-center" style="height: 80px">
                        <q-avatar v-for="n in 5" :key="'patient-' + n" size="40px" class="overlapping" :style="{ left: n * 25 + 'px' }">
                            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                        </q-avatar>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h4>Candidatos</h4>
                    <div class="q-pa-md q-gutter-sm d-flex align-center" style="height: 80px">
                        <q-avatar v-for="n in 5" :key="'candidate-' + n" size="40px" class="overlapping" :style="{ left: n * 25 + 'px' }">
                            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                        </q-avatar>
                    </div>
                </div>
                <div class="col">
                    <h4>Pacientes</h4>
                    <div class="q-pa-md q-gutter-sm d-flex align-center" style="height: 80px">
                        <q-avatar v-for="n in 5" :key="'patient-' + n" size="40px" class="overlapping" :style="{ left: n * 25 + 'px' }">
                            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                        </q-avatar>
                    </div>
                </div>
                <div class="col">
                    <h4>Pacientes</h4>
                    <div class="q-pa-md q-gutter-sm d-flex align-center" style="height: 80px">
                        <q-avatar v-for="n in 5" :key="'patient-' + n" size="40px" class="overlapping" :style="{ left: n * 25 + 'px' }">
                            <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                        </q-avatar>
                    </div>
                </div>
            </div>
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" to="/conversacion/id" />
            <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" />
        </q-page-container>
    </q-layout>
</template>

<style scoped>
:root {
    --bg: #fff;
    --color: #333333;
}

html.dark-mode {
    --bg: #232b32;
    --color: #ddd8ca;
}

body {
    background-color: var(--bg);
    color: var(--color);
}
</style>
