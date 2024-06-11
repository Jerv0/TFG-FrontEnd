<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<script setup lang="ts">
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { ref, computed, watchEffect } from 'vue';
import { store } from '../store/store';

const usuarios = ref<any[]>([]);
const userData: any = store.getCookie('userData');
let allUsers: string[] = [];
const tareasActivas: string[] = [];
let idUserActivo: string[] = []; // Array para almacenar los id_usuario correspondientes a las tareas activas
let idUserNoActivo: string[] = []; // Array para almacenar los id_usuario correspondientes sin tareas 
const currentDate = new Date();

const isLoading = ref<boolean>(true);

// Funcion para obtener usuarios totales, con seguimiento y sin seguimiento
const userTareas = async (id: string) => {
  try {
    const result = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=asigna&id_usuario_asignador=${id}`);
    const dataTareas = result.map((el: any) => el.id_tarea);

    for (let i = 0; i < dataTareas.length; i++) {
      const tareaResult = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=tarea&id_tarea=${dataTareas[i]}`);
      const tarea = tareaResult[0];
      const tareaDate = new Date(tarea.fecha); // Convertir la fecha de la tarea a Date

      if (currentDate < tareaDate) {
        tareasActivas.push(dataTareas[i]);
      }
    }

    const idUser = new Set(result.map((el: any) => el.id_usuario));
    allUsers = Array.from(idUser) as string[];

    for (const tarea of result) {
      if (tareasActivas.includes(tarea.id_tarea)) {
        idUserActivo.push(tarea.id_usuario);
      }
    }

    idUserNoActivo = allUsers
      .filter((element): element is string => typeof element === 'string' && !idUserActivo.includes(element))
      .concat(idUserActivo.filter(element => !allUsers.includes(element)));

    return idUserActivo;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Funcion para obtener los datos de los usuarios
const userAllData = async (idArr: string[]) => {
  const dataAll: any[] = [];
  
  for (let i = 0; i < idArr.length; i++) {
    const result = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${idArr[i]}`);
    if (Array.isArray(result) && result.length > 0) {
      dataAll.push(result[0]);
    }
  }

  return dataAll;
}

const getTareas = async () => {
  try {
    const result = await userTareas(userData.id_usuario);
    const allUserData = await userAllData(allUsers);
    usuarios.value = allUserData;
  } catch (error) {
    console.error(error); 
  }
}

const userIdActivo = (id: string) => {
  store.addCookie('idActivo', id) 
}

// Propiedades computadas para filtrar usuarios
const usuariosSinSeguimiento = computed(() => {
  return usuarios.value.filter(usuario => idUserNoActivo.includes(usuario.id_usuario));
});

const usuariosConSeguimiento = computed(() => {
  return usuarios.value.filter(usuario => idUserActivo.includes(usuario.id_usuario));
});

watchEffect(async () => {
  try {  
    isLoading.value = true;
    await getTareas();
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
});
</script>



<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <DrawerAppBar />

      <div v-if="isLoading" class="loading">Cargando...</div>

      <div v-if="usuariosSinSeguimiento.length === 0">
        <p class="no-users">No hay usuarios sin seguimiento</p>
          </div>
          <div v-else>
            <p class="type">Usuarios sin tareas asignadas</p>
            <div v-for="usuario in usuariosSinSeguimiento" :key="usuario.id_usuario" class="div no-rutina">
              <div class="user-info">
                <p>Username: {{ usuario.username }}</p>
                <p>Nombre: {{ usuario.nombre }}</p>
                <p>Apellido: {{ usuario.apellido }}</p>
                <router-link :to="'/creacionTareas'" class="route" @click="userIdActivo(usuario.id_usuario)">
                  <span class="material-icons">description</span>
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="usuariosConSeguimiento.length === 0">
            <p class="no-users">No hay usuarios con seguimiento</p>
          </div>
          <div v-else>
            <p class="type">Usuarios con tareas activas</p>
            <div v-for="usuario in usuariosConSeguimiento" :key="usuario.id_usuario" class="div si-rutina">
              <div class="user-info">
                <p>Username: {{ usuario.username }}</p>
                <p>Nombre: {{ usuario.nombre }}</p>
                <p>Apellido: {{ usuario.apellido }}</p>
                <router-link :to="'/creacionTareas'" class="route" @click="userIdActivo(usuario.id_usuario)">
                  <span class="material-icons">description</span>
                </router-link>
              </div>
            </div>
          </div>
    </q-page-container>
  </q-layout>
</template>
  
  <style scoped>
.div {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 3px;
}

.no-rutina{
  border: 1px solid red;
}

.si-rutina{
  border: 1px solid green;
}

.type{
  text-align: center;
  margin: 50px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: underline;
  font-style: italic;
}
.user-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}

.user-info p {
  margin: 0;
}

.material-icons{
  font-size: 20px;
  cursor: pointer;
}

.route{ /** Quita el marcado por ser un enlace */
  color: inherit; 
  text-decoration: none;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>