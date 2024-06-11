<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { store } from '../store/store';

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
}

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
      fecha: form.value.fecha.replace(/(?<=-|^)0+(?=\d)/g, '') // Eliminar los ceros de la izquierda
    };

    const asignada = {
      id_usuario: idUserActivo,
      id_usuario_asignador: idCuidadorActivo.id_usuario,
      id_tarea: idTarea
    };

    // Lanzar los dos insert: tablas tarea y asigna
    await store.axiosPost(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=tarea`, tarea);
    await store.axiosPost(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=asigna`, asignada);
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
      <div class="paciente-info">
          <p>Usuario: {{ username }}</p>
          <p>Nombre: {{ name }}</p>
          <p>Apellidos: {{ apellido }}</p>
      </div>

      <p style="text-align: center; font-weight: bold;">Añade tareas para el usuario:</p>

      <div class="rutina">
        <div class="formulario">
          <form @submit.prevent="insertData">
            <div class="form-group">
              <label for="titulo">Título:</label>
              <input type="text" v-model="form.titulo" id="titulo" name="titulo">
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea v-model="form.descripcion" id="descripcion" name="descripcion" rows="4" cols="50"></textarea>
            </div>
            <div class="form-group">
              <label for="fecha">Fecha y Hora:</label>
              <input type="date" v-model="form.fecha" id="fecha" name="fecha">
            </div>
            <div class="form-group">
              <input type="submit" value="Enviar">
            </div>
          </form>
        </div>
      </div>
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
  
    .formulario input[type="text"],
    .formulario input[type="datetime-local"],
    .formulario textarea,
    .formulario select {
      width: calc(100% - 22px);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      font-size: 16px;
    }
  
    .formulario input[type="submit"] {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
  
    .formulario input[type="submit"]:hover {
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
  