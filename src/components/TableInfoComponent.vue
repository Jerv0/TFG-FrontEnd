<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
// Para que no me falle la columna tengo que ponerle este tipo a la variable que declare
// const cols: QTableProps['columns'] = [
//     { label: 'hello', name: '123', field: '123', align: 'left' },
//   ];
import { ref, watchEffect, computed } from 'vue';
import axios from 'axios';

// Define los props que el componente recibirá
const props = defineProps<{
    table: string;
}>();

// Construye las URLs usando las variables de entorno
const urlUsers = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/user?table=${props.table}&id=1`;
});

const urlcustom = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/user?table=${props.table}&id=1`;
});

// Variable para almacenar los datos de la API
const data = ref<unknown[]>([]);
const error = ref<string | null>(null);

// Observa cambios en la URL y realiza la solicitud de datos
watchEffect(async () => {
    try {
        const [responseUsers, responseCustom] = await Promise.all([axios.get(urlUsers.value), axios.get(urlcustom.value)]);
        const combinedData = [];
        combinedData.push(...responseUsers.data.usuarios);
        combinedData.push(...responseCustom.data.usuarios);
        data.value = combinedData;
    } catch (err) {
        error.value = 'Fallo al buscar la informacion';
        console.error(err);
    }
});
</script>
<template>
    <div class="q-pa-md">
        <p>Table: {{ props.table }}</p>
        <p>URL: {{ urlUsers }}</p>
        <q-table v-if="data && data.length" :rows="data" row-key="id">
            <template v-slot:top>
                <q-btn color="primary" label="Add row" />

                <q-space />
            </template>
        </q-table>
        <div v-if="error">
            <h3>Error:</h3>
            <p>{{ error }}</p>
        </div>
    </div>
</template>
<style scoped>
.q-pa-md {
    padding: 1rem;
}
</style>
