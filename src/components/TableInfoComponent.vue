<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import axios from 'axios';
import { QTableProps } from 'quasar';
import ModalEdit from './ModalEditUsersComponent.vue';
import ModalCreate from './ModalCreateUsersComponent.vue';
import toast from '../utils/formatNotify';
import { store } from '../store/store';
const props = defineProps<{
    table: string;
}>();


const loading = ref(false);
const data = ref<unknown[]>([]);
const error = ref<string | null>(null);
const columns = ref<QTableProps['columns']>([]);
const urlUsers = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?usertype=${props.table}`;
});
const urlCustom = computed(() => {
    return `https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/pacienteJavi`;
});

const fetchData = async (url: string) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await axios.get(url);
        return response.data.usuarios;
    } catch (error) {
        throw new Error(`Error al obtener los datos: ${error}`);
    }
};
const loadData = async () => {
    loading.value = true; // Marcamos que se están cargando los datos
    try {
        columns.value = [];
        data.value = [];
        const dataUsers = await fetchData(urlUsers.value);
        const dataCustom = await fetchData(urlCustom.value);

        const combinedData = [...dataUsers, ...dataCustom];

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

        columns.value.push({ name: 'actions', align: 'center', label: 'Acciones', field: 'actions' });
    } catch (err) {
        error.value = 'Error al obtener la información';
        console.error(err);
    } finally {
        loading.value = false; // Marcamos que la carga de datos ha terminado
    }
};
const deleteRow = async (id: string) => {
    try {
        await axios.delete(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?id="${id}"`);
        // Después de eliminar la fila, volvemos a cargar los datos
        toast('negative', 'Usuario eliminado');
        loadData();
    } catch (e) {
        console.log(e);
    }
};
watchEffect(() => {
    loadData();
});
</script>
<template>
    <div class="q-pa-md">
        {{ store }}
        <q-table v-if="!loading" :rows="data" :columns="columns" row-key="id" class="my-sticky-last-column-table">
            <template v-slot:top>
                <ModalCreate @userUpdated="loadData" />
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <ModalEdit :row="props.row" :type="table" @userUpdated="loadData" />
                    <q-space />
                    <q-btn color="negative" icon="delete" @click="deleteRow(props.row.id)" />
                </q-td>
            </template>
        </q-table>
        <div v-if="loading" class="spinner-container">
            <q-spinner-hourglass size="50px" color="primary" />
        </div>
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

.spinner-container
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
</style>
