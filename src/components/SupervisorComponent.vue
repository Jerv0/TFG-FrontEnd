<script  setup lang="ts">

</script>

<template>
        <q-layout view="hHh lpR fFf">
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
                <!-- <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" to="/conversacion/id" /> -->
                <!-- <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" /> -->
            </q-page-container>
        </q-layout>
      
</template>

<style scoped>
</style>
