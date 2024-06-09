<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import axios from 'axios';
import CellComponent from './CellComponent.vue';
import toast from '../utils/formatNotify';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';

// Interfaces para las propiedades y tareas
interface Props {
  mes?: number;
  anio?: number;
  cols?: string[];
  COLS?: number;
  ROWS?: number;
  id_usuario?: string;
}

interface Tarea {
  fecha: string;
  titulo: string;
  descripcion: string;
}

// Estado reactivo para las tareas
let tareas = ref<Tarea[]>([]);

// Propiedades por defecto con valores iniciales
const props = withDefaults(defineProps<Props>(), {
  cols: () => ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  COLS: 7,
  ROWS: 6,
  anio: new Date().getFullYear(), // Año actual por defecto
  mes: new Date().getMonth() + 1  // Mes actual por defecto
});

// Función para convertir el número de orden del día en filas y columnas
const anadevalorSecuencial = (numero: number, valor: string, celdas: string[][]) => {
  const fila = Math.floor(numero / props.COLS);
  const columna = numero % props.COLS;
  celdas[fila][columna] = valor;
};

// Computed para generar la tabla del mes
const tablaMes = computed(() => {
  // Inicialización de la matriz de celdas
  const celdas = Array.from(Array(props.ROWS), () =>
    Array(props.COLS).fill('-')
  );
  // Cálculo del primer día del mes y su posición
  const primerDia = new Date(props.anio, props.mes - 1, 1);
  const posicionPrimerDia = [6, 0, 1, 2, 3, 4, 5][primerDia.getDay()];
  // Número de días en el mes
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate();
  // Rango de números para las fechas del mes
  const rangoNumeros = Array.from({ length: numDiasMes }, (_, i) => i + posicionPrimerDia);
  // Asignación de fechas a la matriz de celdas
  rangoNumeros.forEach((el, ind) => anadevalorSecuencial(el, `${ind + 1}/${props.mes}/${props.anio}`, celdas));
  return celdas;
});

// Función para importar tareas del usuario
const importarTareas = async () => {
  try {
    const response = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=asigna&id_usuario=${props.id_usuario}`);
    // Procesamiento de las tareas recibidas
    response.data.usuarios.forEach(async (el: { id_tarea: string }) => {
      const response2 = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=tarea&id_tarea=${el.id_tarea}`);
      const fechaDB = response2.data.usuarios[0].fecha;
      const fechaArray = fechaDB.split('-');
      const fechaFormateada = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`; // Formato "dd/mm/aaaa"
      
      const titulo = response2.data.usuarios[0].titulo;
      const descripcion = response2.data.usuarios[0].descripcion;
      
      // Añadir tarea al estado reactivo
      tareas.value.push({
        fecha: fechaFormateada,
        titulo: titulo,
        descripcion: descripcion
      });
    });
  } catch (error) {
    toast('error', 'Error de conexión');
  }
};

// Función para obtener la fecha de hoy
const obtenerDiaHoy = () => {
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1;
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

// Fecha de hoy para marcar en el calendario
const diaHoy = obtenerDiaHoy();

// Llamada a importarTareas al montar el componente
onMounted(() => {
  importarTareas();
});
</script>

<template>
  <DrawerAppBar/>
  <table class="calendar">
    <thead>
      <tr>
        <th v-for="c in cols" :key="c" class="days">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in ROWS" :key="i">
        <td v-for="j in COLS" :key="j" class="calendar-cell" :class="{ 'today': tablaMes[i - 1][j - 1] === diaHoy }">
          <CellComponent v-if="tablaMes[i - 1][j -1] !== '-'" :valor="tablaMes[i - 1][j-1]" :tareas="tareas" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.calendar {
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
}

.calendar th, .calendar td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 8px;
}

.calendar-cell{
  background-color: rgb(221, 225, 235);
}

.calendar-cell:hover {
  background-color: #dbd9d9;
}

.calendar-cell {
  height: 60px; /* Ajuste de la altura de las celdas */
}

.days{
/*   background-color: #EFC08C; */
background-color: rgb(94, 102, 182);
}

.today {
  background-color: #a8b9ef; /* Color para el día actual */
}

@media (max-width: 1360px){
  .calendar-table th {
    width: calc(100% / 7); 
    max-width: calc(100% / 7); 
    font-size: 16px; 
  }

  .calendar-cell {
    width: calc(100% / 7); 
    max-width: calc(100% / 7); 
    height: 80px; 
    font-size: 14px; 
  }

}

@media (max-width: 1287px){
  .calendar-table th{
      width: 250px;
      max-width:150px;
    }

    .calendar-cell{
      width: 250px; 
      max-width: 150px;
    }
}

@media(max-width: 1050px){
  .calendar-table th{
      max-width:25%;
    }

    .calendar-cell{
      max-width: 25%;
    } 
}

@media (max-width: 830px){
  .calendar-table th{
      max-width:115px;
    }

    .calendar-cell{
      max-width: 117px;
    } 
}
</style>
