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

const tareasCompletadas = ref<boolean[]>([]);

const tareasFiltradas = computed(() => {
  return props.tareas?.filter((el) => el.fecha === props.valor);
});

/**se hace para que se ponga en verde cuando se le de al check de la tarea. */
const modificar = (index: number) => {
  tareasCompletadas.value[index] = !tareasCompletadas.value[index];
};

</script>


<template>
  <div class="celda">
    <p class="fecha">{{ props.valor }}</p>
    <div class="tareas" v-for="(el, index) in tareasFiltradas" :key="index">
      <div class="tarea-header">
        <p :class="['titulo', { done: tareasCompletadas[index] }]">{{ el.titulo }}</p>
        <button class="buttonDone" @click="modificar(index)">
          <img src="../../dist/spa/icons/done.png" />
        </button>
      </div>
      <p :class="['descripcion', { done: tareasCompletadas[index] }]">{{ el.descripcion }}</p>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 20px;
}

.tareas {
  margin-bottom: 10px;
  border: 2px dotted #df6981;
  border-radius: 25px;
  text-align: center;
  margin-top: 20px;
  background-color: rgb(204, 143, 73); 
  color: white;
  font-size: 20px;
  padding: 10px; /* Añade un poco de relleno para que el contenido no esté pegado al borde */
}

.tarea-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button img {
  width: 20px;
  height: 20px;
}

.titulo {
  color: red;
}

.done {
  color: green;
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


