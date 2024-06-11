<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { store } from '../store/store';
import { ref, computed, watchEffect } from 'vue';

const busqueda = ref('');
const infoPaciente = ref<number | null>(null);
const activeTab = ref('userInfo');
const filtroSeleccionado = ref<string>('nombre');
const userData: any = store.getCookie('userData');

interface PacienteUsuario {
  id: string;
  nombre: string;
  apellido: string;
  dir: string;
  dni: string;
  email: string;
  tel: string;
  contact_emerg: string;
  alergias: string;
  especialidad_requerida: string;
  medicamentos: string;
}

const pacientesUsuarios = ref<PacienteUsuario[]>([]);

const userSupervisor = async (id: string) => {
  try {
    const result = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=paciente&id_supervisor=${id}`);
    const idPacientesArray = result.map((el: any) => el.id_usuario);
    const dataAll: any[] = [];

    for(let i=0; i<idPacientesArray.length; i++){
      const result = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${idPacientesArray[i]}`);
      dataAll.push(result);
    }

    const combinedData = result.map((paciente: any) => {
      const userData = dataAll.find((userArray: any) => userArray[0].id_usuario === paciente.id_usuario);
      if (userData) {
        const user = userData[0];
        return {
          id: user.id_usuario,
          apellido: user.apellido,
          dir: user.dir,
          dni: user.dni,
          email: user.email,
          nombre: user.nombre,
          tel: user.tel,
          contact_emerg: paciente.contact_emerg,
          alergias: paciente.alergias,
          especialidad_requerida: paciente.especialidad_requerida,
          medicamentos: paciente.medicamentos
        };
      }
      return null;
});

pacientesUsuarios.value = combinedData; // almacenar los datos en la variable reactiva
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const userIdActivo = (id: string) => {
  store.addCookie('idActivo', id) 
}

const changeView = (id: number) => {
  infoPaciente.value = infoPaciente.value === id ? null : id;
  activeTab.value = 'userInfo';
};

const filtroPacientes = computed(() => {
  return pacientesUsuarios.value.filter(paciente =>
    paciente[filtroSeleccionado.value as keyof PacienteUsuario].toLowerCase().includes(busqueda.value.toLowerCase())
  );
});


watchEffect(async () => {
  try {  
    await userSupervisor(userData.id_usuario);
  } catch (error) {
    console.error(error);
  }
});

</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <DrawerAppBar />
  
      <!-- Barra de búsqueda -->
      <q-input v-model="busqueda" class="buscador" placeholder="Buscar paciente..."/>

      <div class="checkbox-container">
        <label><input type="radio" name="order" value="nombre" v-model="filtroSeleccionado"> Nombre</label>
        <label><input type="radio" name="order" value="apellido" v-model="filtroSeleccionado"> Apellido</label>
        <label><input type="radio" name="order" value="especialidad_requerida" v-model="filtroSeleccionado"> Especialidad</label>
      </div>

      <!-- Lista de pacientes filtrada -->
      <div v-if="filtroPacientes.length > 0">
        <div class="q-mb-md">
          <q-card v-for="el in filtroPacientes" :key="el.id">
            <q-card-section>
              <div class="patient-header" @click="changeView(parseInt(el.id))">
                <div class="text-h6">{{ el.nombre }} {{ el.apellido }}</div>
                <i :class="{'expanded': infoPaciente === (el.id ? parseInt(el.id) : null)}">▼</i>
              </div>

              <div v-if="infoPaciente === (el.id ? parseInt(el.id) : null)" class="patient-info">
                <q-tabs v-model="activeTab">
                  <q-tab name="userInfo" label="Información del Usuario"></q-tab>
                  <q-tab name="medicalInfo" label="Información Médica"></q-tab>
                </q-tabs>

                <q-tab-panels v-model="activeTab">
                  <q-tab-panel name="userInfo">
                    <div><strong>Nombre:</strong> {{ el.nombre }}</div>
                    <div><strong>Apellido:</strong> {{ el.apellido }}</div>
                    <div><strong>Dirección:</strong> {{ el.dir }}</div>
                    <div><strong>Contacto de Emergencia:</strong> {{ el.contact_emerg }}</div>
                    <div><strong>Teléfono:</strong> {{ el.tel }}</div>
                  </q-tab-panel>
                  <q-tab-panel name="medicalInfo">
                    <div><strong>Especialidad Requerida:</strong> {{ el.especialidad_requerida }}</div>
                    <div><strong>Alergias:</strong> {{ el.alergias }}</div>
                    <div><strong>Medicamentos:</strong> {{ el.medicamentos }}</div>
                  </q-tab-panel>
                </q-tab-panels>

                <router-link :to="'/creacionTareas'" class="route" @click="userIdActivo(el.id)">
                  <span class="material-icons">description</span>
                </router-link>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div v-else>
        <p>No se encontraron resultados.</p>
      </div>

    </q-page-container>
  </q-layout>
</template>

<style scoped>
.patient-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.arrow-icon {
  font-size: 1.2em;
}
.expanded {
  transform: rotate(180deg);
}
.patient-info {
  margin-top: 10px;
}

.buscador{
  margin: 15px;
}

.checkbox-container{
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  margin-bottom: 15px;
}

.material-icons {
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 15px;

}

.route{ /** Quita el marcado por ser un enlace */
  color: inherit; 
  text-decoration: none;
}
</style>
