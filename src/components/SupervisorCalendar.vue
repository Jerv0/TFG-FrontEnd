<script setup lang="ts">
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import { ref } from 'vue';


// Datos de ejemplo de pacientes (Cambiar por llamada get a API)
const pacientes = ref([
  { id: 1, name: 'Paciente 1', apellido: 'Apellido Paciente1', dni: '0000000000G', grado: 'Grado I', nombre_dependencia: 'Alzehimer' },
  { id: 2, name: 'Paciente 2', apellido: 'Apellido Paciente2', dni: '1111111111G', grado: 'Grado II', nombre_dependencia: 'Tercera Edad' },
 
]);


</script>
<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <DrawerAppBar ver="" />
  
        <div class="paciente-info">
          <p>Nombre: {{ pacientes[0].name }}</p>
          <p>Apellidos: {{ pacientes[0].apellido }}</p>
          <p>Dependencia: {{ pacientes[0].nombre_dependencia }}</p>
        </div>
  
    <div class="rutina">
        <div class="formulario">
          <form action="/submit" method="post">
            <div class="form-group">
              <label for="tipo_tarea" style="text-align: center; font-weight: bold;">Tipo de Tarea:</label>
              <select id="tipo_tarea" name="tipo_tarea">
                <option value="tarea">Tarea</option>
                <option value="actividad">Actividad</option>
                <option value="cita">Cita</option>
              </select>
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea id="descripcion" name="descripcion" rows="4" cols="50"></textarea>
            </div>
            <div class="form-group">
              <label for="fecha_hora">Fecha y Hora:</label>
              <input type="datetime-local" id="fecha_hora" name="fecha_hora">
            </div>
            <div class="form-group">
              <input type="submit" value="Enviar">
            </div>
          </form>
        </div>
  
        <!-- Información del día -->
        <div class="info-dia">
          <p style="text-align: center; font-weight: bold;">Información del Día:</p>
        </div>
    </div>
        <!-- Botones fijos -->
        <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" to="/conversacion/id" />
        <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" />
      </q-page-container>
    </q-layout>
  </template>
  
  <style scoped>
    .formulario {
      max-width: 400px;
      margin-right: 20px;
      padding: 20px;
      background-color: #f0f0f0;
      border-radius: 8px;
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
      background-color: #f0f0f0;
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
      background-color: #f0f0f0;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .rutina {
      display: flex;
      justify-content: center;   
    }
  </style>
  