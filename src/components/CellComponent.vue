<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';

interface Tarea {
  fecha: string;
  titulo: string;
  descripcion: string;
}

interface Props {
  valor?: string;
  tareas?: Tarea[];
}

const props = defineProps<Props>();
console.log(props.valor)

const tareasFiltradas = computed(() => {
  return props.tareas?.filter((el) =>el.fecha === props.valor)
});

 

</script>

<template>
  <div class="celda">
    <p class="fecha">{{ props.valor }}</p>
    
      <div class="tareas" v-for="(el, index) in tareasFiltradas" :key="index">
        <p class="titulo">{{ el.titulo }}</p>
        <p class="descripcion">{{ el.descripcion }}</p>
      </div>
 
  </div>
</template>

<style>

p{
  font-size: 20px;
}

.titulo{
  color: red;
}
.cell, .cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>
