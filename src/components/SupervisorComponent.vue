<script setup lang="ts">
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { ref, computed } from 'vue';

// Datos de ejemplo de pacientes (Cambiar por llamada get a API)
const pacientes = ref([
  { id: 1, name: 'Paciente 1', apellido: 'Apellido Paciente1', dni: '0000000000G', grado: 'Grado I', nombre_dependencia: 'Alzehimer' },
  { id: 2, name: 'Paciente 2', apellido: 'Apellido Paciente2', dni: '1111111111G', grado: 'Grado II', nombre_dependencia: 'Tercera Edad' },
]);

const busqueda = ref('');

// Función computada para filtrar pacientes basados en la búsqueda
  // Falta completa demas campos de busqueda
const filtroPacientes = computed(() => {
  return pacientes.value.filter(paciente =>
  paciente.name.toLowerCase().includes(busqueda.value.toLowerCase())
  );
});

// Variable reactiva para controlar qué paciente tiene su información desplegada
const infoPaciente = ref<number | null>(null);

// Método para cambiar el paciente cuya información está desplegada
const changeInfo = (id: number) => {
  infoPaciente.value = infoPaciente.value === id ? null : id;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <DrawerAppBar ver="" />
  
      <!-- Barra de búsqueda -->
      <q-input v-model="busqueda" class="buscador" placeholder="Buscar paciente..."/>

      <div class="checkbox-container">
        <label><input type="radio" name="order"> Nombre</label>
        <label><input type="radio" name="order"> Apellido</label>
        <label><input type="radio" name="order"> DNI</label>
        <label><input type="radio" name="order"> Grado</label>
        <label><input type="radio" name="order"> Expiración Rutina</label>
      </div>
  
      <!-- Lista de pacientes filtrada -->
      <div v-if="filtroPacientes.length > 0">
        <div class="q-mb-md">
          <q-card v-for="el in filtroPacientes" :key="el.id">
            <q-card-section>
              <div class="patient-header" @click="changeInfo(el.id)">
                <div class="text-h6">{{ el.name }} {{ el.apellido }}</div>
                <i class="arrow-icon" :class="{'expanded': infoPaciente === el.id}">▼</i>
              </div>
              <div v-if="infoPaciente === el.id" class="patient-info">
                <div><strong>DNI:</strong> {{ el.dni }}</div>
                <div><strong>Grado:</strong> {{ el.grado }}</div>
                <div><strong>Dependencia:</strong> {{ el.nombre_dependencia }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div v-else>
        <p>No se encontraron resultados.</p>
      </div>

      <!-- Cambiar por el menú -->
      <router-link to="/supervisorCalendar">
        <button>Ir al Calendario del Supervisor</button>
      </router-link>
      <!-- Botones fijos -->
      <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" to="/conversacion/id" />
      <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" />
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
</style>
