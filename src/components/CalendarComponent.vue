<script setup lang="ts">
import {computed, ref } from 'vue'
import axios from 'axios';
import CellComponent from './CellComponent.vue'
import { store } from '../store/store';
import toast from '../utils/formatNotify';
interface Props{
    mes?:number
    anio?:number
    cols?:string[]
    COLS?:number
    ROWS?:number
    id_usuario?:string
}

interface Tarea {
  fecha: string;
  titulo: string;
  descripcion: string;
}

let tareas = ref<Tarea[]>([]);
 
const props = withDefaults(defineProps<Props>(),{
            cols: ()=> ['Lunes', 'Martes', 'Miércoles', 'Jueves','Viernes','Sábado', 'Domingo'],
            COLS: 7,
            ROWS: 6,
            anio: 2000,
            mes: 1
})

//Convertimos el número de orden del día en filas y columnas
const anadevalorSecuencial = (numero:number, valor:string, celdas:string[][]) =>{
    const fila = Math.floor(numero / props.COLS);
    const columna = numero % props.COLS;
    celdas[fila][columna]=valor 
}


const tablaMes = computed(() =>{
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
                        Array.from(Array(props.ROWS).keys()).map(() => '- '))
  const primerDia = new Date(`${props.anio}-${props.mes}-1`)
  const posicionPrimerDia = [6,0,1,2,3,4,5][primerDia.getDay()]
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate()
  const rangoNumeros = [...Array(numDiasMes).keys()] .map(i => i + posicionPrimerDia )
  //Recorremos el rango de números para añadir la fecha
  rangoNumeros.map((el,ind)=> anadevalorSecuencial(el,`${ind +1}/${props.mes}/${props.anio}`, celdas))
  return celdas
})


const importarTareas = async () => {
    try {
        const response = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=asigna&id_usuario=${props.id_usuario}`);
       /*  const id_tareas = response.data.usuarios[0].id_tarea;
        console.log('responseee:', id_tareas); */
        response.data.usuarios.forEach(async (el: { id_tarea: string }) => {

            const response2 = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=tarea&id_tarea=${el.id_tarea}`);
            const fechaDB = response2.data.usuarios[0].fecha;
            const fechaArray = fechaDB.split('-');
            const fechaFormateada = `${fechaArray[2]}/${fechaArray[1]}/${fechaArray[0]}`; // Formatea la fecha como "18/05/2024"
          
            const titulo = response2.data.usuarios[0].titulo;
            const descripcion = response2.data.usuarios[0].descripcion;
          
            tareas.value.push({
                fecha: fechaFormateada,
                titulo: titulo,
                descripcion: descripcion
            }); 


        });

        console.log('lo que mando a celda', tareas.value)
        // store.addCookie('userTarea', response.data.usuarios[0]);
    } catch (error) {
        toast('error', 'Error de conexión');
    }
};
</script>

<template>
   <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="c in cols" :key="c">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in props.ROWS" :key="i">
        <th>{{ i - 1 }}</th>
        <td v-for="(c, j) in cols" :key="c">
          <CellComponent :valor="tablaMes[i-1][j]" :tareas="tareas" />
        </td>
      </tr>
    </tbody>
  </table>
  <button @click="importarTareas">hola</button>
</template>

<style>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}
 
tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}

</style>