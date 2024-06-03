<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { QTableProps } from 'quasar';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import toast from '../utils/formatNotify';
import { store } from '../store/store';

const loading = ref(false);
const data = ref<unknown[]>([]);
const error = ref<string | null>(null);
const columns = ref<QTableProps['columns']>([]);

const loadData = async () => {
    loading.value = true; // Marcamos que se están cargando los datos
    try {
        columns.value = [];
        data.value = [];
        const dataUsers = await store.axiosGetWithTimeout(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&usertype=supervisor`);
        const dataCustom = await store.axiosGetWithTimeout(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=supervisor&activado=0`);

        const combinedData = [...dataUsers, ...dataCustom];

        const allProperties = combinedData.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        const groupedData = combinedData.reduce((acc, obj) => ({ ...acc, [obj.id_usuario]: { ...(acc[obj.id_usuario] || {}), ...obj } }), {});
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
        //Asi filtramos y quitamos los que estan activados para tener la tabla de los que nos interesan
        data.value = data.value.filter((el: any) => el.activado);
        //Asi conseguimos quitar algun campo que no nos interese
        columns.value = columns.value.filter((el: any) => el.name !== 'activado');

        columns.value.push({ name: 'actions', align: 'center', label: 'Aceptar', field: 'actions' });
    } catch (err) {
        error.value = 'Error al obtener la información';
        console.error(err);
    } finally {
        loading.value = false; // Marcamos que la carga de datos ha terminado
    }
};
const activateApplicant = async (id: string) => {
    try {
        await store.axiosPut(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=supervisor&id_usuario=${id}`, { id_usuario: id, activado: '1' });
        toast('positive', 'Supervisor Activado');
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
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar />
        <q-page-container>
            <q-page>
                {{ store }}
                <q-table v-if="!loading" :rows="data" :columns="columns" row-key="id" class="my-sticky-last-column-table">
                    <template v-slot:top> </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                            <q-btn color="positive" icon="check" @click="activateApplicant(props.row.id_usuario)" />
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
            </q-page>
        </q-page-container>
    </q-layout>
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
