<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import axios from 'axios';
import { QTableProps } from 'quasar';
import modal from './ModalEditUsersComponent.vue';
import toast from '../utils/formatNotify';
const props = defineProps<{
    table: string;
}>();

const urlUsers = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?usertype=${props.table}`;
});
const urlcustom = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/pacienteJavi`;
});

const data = ref<unknown[]>([]);
const error = ref<string | null>(null);
const columns = ref<QTableProps['columns']>([]);

const loadData = async () => {
    try {
        columns.value = [];
        data.value = [];

        const [responseUsers, responseCustom] = await Promise.all([axios.get(urlUsers.value), axios.get(urlcustom.value)]);
        const combinedData = [...responseUsers.data.usuarios, ...responseCustom.data.usuarios];

        if (combinedData.length > 0) {
            const allProperties = combinedData.reduce((acc, obj) => ({ ...acc, ...obj }), {});
            const groupedData = combinedData.reduce((acc, obj) => ({ ...acc, [obj.id]: { ...(acc[obj.id] || {}), ...obj } }), {});
            const combinedAndGroupedData = Object.values(groupedData);

            const dynamicColumns = Object.keys(allProperties).map((key) => ({
                name: key,
                align: 'center' as const,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                field: key,
                sortable: true,
            }));

            columns.value.splice(2, 0, ...dynamicColumns);
            data.value = combinedAndGroupedData;
        } else {
            error.value = 'NO HAY DATOS DISPONIBLES';
        }

        columns.value.push({ name: 'actions', align: 'center', label: 'Acciones', field: 'actions' });
    } catch (err) {
        error.value = 'Error al obtener la información';
        console.error(err);
    }
};
const deleteRow = async (id: number) => {
    await axios.delete(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?id=${id}`);
    // Después de eliminar la fila, volvemos a cargar los datos
    toast('negative', 'Usuario eliminado');
    loadData();
};

watchEffect(() => {
    loadData();
});
</script>
<template>
    <div class="q-pa-md">
        <p>Table: {{ props.table }}</p>
        <p>URL: {{ urlUsers }}</p>
        <q-table v-if="data && data.length" :rows="data" :columns="columns" row-key="id" class="my-sticky-last-column-table">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <modal :row="props.row" :type="table" />
                    <q-space />
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

<style lang="sass">

.my-sticky-last-column-table
  thead tr:last-child th:last-child

    background-color: #ada6a8

  td:last-child
    background-color: #ada6a8

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
