<template>
  <div class="celda">
    <p class="fecha">{{ props.valor }}</p>
    <div class="tareas" v-for="(el, index) in tareasFiltradas" :key="index" :style="{ backgroundColor: randomColor() }">
      <div class="tarea-header">
        <p :class="['titulo', { done: tareasCompletadas[index] }]" @click="modificar(index)">{{ el.titulo }}</p>
        <button class="buttonDone" @click="modificar(index)">
          <img src="../../dist/spa/icons/done.png" />
        </button>
      </div>
      <!-- <p :class="['descripcion', { done: tareasCompletadas[index] }]">{{ el.descripcion }}</p> -->
    </div>
  </div>
</template>

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

const colores = ['#EA77CD', '#3BDFB5', '#CF69EA', '#ED873B', '#EF4F42', '#EECC4E', '#70ED55', '#5FA0E9'];

const tareasFiltradas = computed(() => {
  return props.tareas?.filter((el) => el.fecha === props.valor);
});

/**se hace para que se ponga en verde cuando se le de al check de la tarea. */
const modificar = (index: number) => {
  tareasCompletadas.value[index] = !tareasCompletadas.value[index];
};

const randomColor = () => {
  // Generar un índice aleatorio para el array de colores
  const randomIndex = Math.floor(Math.random() * colores.length);
  return colores[randomIndex];
};
</script>

<style scoped>
p {
  font-size: 20px;
}

.tareas {
  margin-bottom: 10px;
  text-align: center;
  margin-top: 20px;
  color: white;
  font-size: 20px;
  
}

.tareas .titulo {
  cursor: pointer; /* Cambia el cursor a mano cuando pasas por encima */
}

.tarea-header {
  display: flex;
  justify-content:space-evenly;
  align-items: center;
}

button img {
  width: 20px;
  height: 20px;
}

.titulo {
  color: black;
}

.done {
  color: green;
  text-decoration: line-through; /* Tacha el texto */
}

.cell,
.cell input {
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
