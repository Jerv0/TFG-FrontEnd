<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { store } from '../store/store';
import toast from '../utils/formatNotify';
const idUser = ref('');
const username = ref('');
const name = ref('');
const apellido = ref('');

const idUserActivo: any = store.getCookie('idActivo');
const idCuidadorActivo: any = store.getCookie('userData');

const userData = async (id: string) => {
    try {
        const result = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${id}`);
        idUser.value = result[0].id_usuario;
        username.value = result[0].username;
        name.value = result[0].nombre;
        apellido.value = result[0].apellido;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const resetForm = () => {
    form.value.titulo = '';
    form.value.descripcion = '';
    form.value.fecha = '';
};

const form = ref({
    titulo: '',
    descripcion: '',
    fecha: '',
});

// Función para insertar una tarea a un usuario
const insertData = async () => {
    try {
        const result = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=tarea`);

        // Obtener el último ID de las tareas de la BD
        const idTarea = 'tarea' + (result.length + 1);

        console.log(result);

        const tarea = {
            id_tarea: idTarea,
            titulo: form.value.titulo,
            descripcion: form.value.descripcion,
            fecha: form.value.fecha.replace(/(?<=-|^)0+(?=\d)/g, ''), // Eliminar los ceros de la izquierda
        };

        const asignada = {
            id_usuario: idUserActivo,
            id_usuario_asignador: idCuidadorActivo.id_usuario,
            id_tarea: idTarea,
        };

        // Lanzar los dos insert: tablas tarea y asigna
        await store.axiosPost(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=tarea`, tarea);
        await store.axiosPost(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=asigna`, asignada);
        toast('green', 'Tarea Asignada');
        resetForm();
    } catch (error) {
        console.error('Error al insertar los datos:', error);
    }
};

resetForm();
userData(idUserActivo);
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <DrawerAppBar />
            <h4 class="text-center text-bold">Añade tareas para {{name}} {{ apellido }}</h4>

            <q-card class="q-pa-md q-my-md">
                <q-card-section>
                    <q-card-title> Formulario de Tareas </q-card-title>
                </q-card-section>
                <q-form @submit.prevent="insertData" class="q-gutter-md">
                    <q-input v-model="form.titulo" label="Título" outlined :rules="[(val) => !!val || 'Añade un titulo']" />
                    <q-input v-model="form.descripcion" label="Descripción" type="textarea" rows="4" outlined />
                    <q-input v-model="form.fecha" label="Fecha y Hora" type="date" outlined :rules="[(val) => !!val || 'Fecha Obligatoria']" />
                    <div class="q-mt-md">
                        <q-btn type="submit" label="Enviar" color="primary" to="supervisor"/>
                        <q-btn label="Limpiar Campos" color="secondary" class="q-ml-sm" @click="resetForm" />
                        <q-btn label="Volver" to="supervisor" color="warning" class="q-ml-sm" />
                    </div>
                </q-form>
            </q-card>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.formulario {
    max-width: 400px;
    margin-right: 20px;
    padding: 20px;
    border-radius: 8px;
    border: 3px black solid;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.formulario .form-group {
    margin-bottom: 20px;
}

.formulario label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.formulario input[type='text'],
.formulario input[type='datetime-local'],
.formulario textarea,
.formulario select {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
}

.formulario input[type='submit'] {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.formulario input[type='submit']:hover {
    background-color: #45a049;
}

.paciente-info {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    white-space: nowrap;
}

.paciente-info p {
    display: inline;
    margin-right: 20px;
}

.info-dia {
    width: 200px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.rutina {
    display: flex;
    justify-content: center;
}
</style>
