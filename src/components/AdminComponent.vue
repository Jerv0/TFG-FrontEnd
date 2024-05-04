<script  setup lang="ts">
</script>

<template>
        <q-layout view="hHh lpR fFf">
            <q-page-container>
                <h4>Candidatos</h4>
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
                <h4>Supervisores</h4>
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
                <h4>Pacientes</h4>
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
            </q-page-container>
        </q-layout>
      
</template>

<style scoped>

 

</style>
