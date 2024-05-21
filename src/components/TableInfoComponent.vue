<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import axios from 'axios';
import { QTableProps } from 'quasar';

// Define los props que el componente recibirá
const props = defineProps<{
    table: string;
}>();

// Construye las URLs usando las variables de entorno
const urlUsers = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/user?table=${props.table}&id=1`;
});
const urlcustom = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/user?table=tarea&id=1`;
});

const urlUsers1 = [{ usuarios: {} }];
// Variable para almacenar los datos de la API
const data = ref<unknown[]>([]);
const error = ref<string | null>(null);

// Define las columnas de la tabla, incluyendo una para las acciones
const columns = ref<QTableProps['columns']>([]);

// Método para manejar la eliminación de una fila
const deleteRow = (id: number) => {
    //Axios delete aqui
    console.log('elemento borrado --> id: ' + id);
};
// Observa cambios en la URL y realiza la solicitud de datos
watchEffect(async () => {
    try {
        // Limpiar las columnas y datos al inicio
        columns.value = [];
        data.value = [];

        // Realizar las llamadas API en paralelo
        const [responseUsers, responseCustom] = await Promise.all([axios.get(urlUsers.value), axios.get(urlcustom.value)]);

        console.log(responseUsers.data);
        // Combinar los datos de ambas respuestas
        const combinedData = [...responseUsers.data.usuarios, ...responseCustom.data.usuarios];
        // Fusionar los atributos de los objetos en combinedData
        const mergedData = combinedData.reduce((acc, obj) => {
            return { ...acc, ...obj };
        }, {});
        data.value = [mergedData];
        console.log(data.value);

        // Solo agregar columnas dinámicas si data.value no está vacío
        if (data.value.length > 0) {
            const dynamicColumns = Object.keys(data.value[0] as object).map((key) => ({
                name: key,
                align: 'left' as const,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                field: key,
            }));
            // Añadir las columnas dinámicas
            columns.value.splice(2, 0, ...dynamicColumns);
        }

        // Añadir la columna de acciones al final
        columns.value.push({ name: 'actions', align: 'center', label: 'Actions', field: 'actions' });
    } catch (err) {
        error.value = 'Fallo al buscar la información';
        console.error(err);
    }
});
</script>

<template>
    <div class="q-pa-md">
        <p>Table: {{ props.table }}</p>
        <p>URL: {{ urlUsers }}</p>
        <q-table v-if="data && data.length" :rows="data" :columns="columns" row-key="id">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="negative" icon="delete" @click="deleteRow(props.row.id)" />
                </q-td>
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
