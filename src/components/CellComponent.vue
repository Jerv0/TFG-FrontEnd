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

<template>
  <div class="celda">
    <p class="fecha">{{props.valor}}</p>
    <div class="tareas" v-for="(el, index) in tareasFiltradas" :key="index" :style="{ backgroundColor: randomColor() }">
      <div class="tarea-header">
        <p :class="['titulo', { done: tareasCompletadas[index] }]" @click="modificar(index)">{{ el.titulo }}</p>
        <button class="buttonDone" @click="modificar(index)">
          <img src="../../dist/spa/icons/done.png" />
        </button>
      </div>
    </div>
  </div>
</template>

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
  border-radius: 10px;

}

.tareas .titulo {
  cursor: pointer;  
}

.tareas:hover {
  box-shadow: 0 6px 12px rgba(223, 105, 129, 0.5);
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
  text-decoration: line-through;  
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

.fecha{
  color: #4b4141;
}

@media (max-width: 1050px){
    .first-elements{
        font-size: 10px;
    }
    .tareas{
        padding: 2px;
    }
    button img {
        width: 15px;
        height: 15px;
    }
    .tareas p{
        font-size: 20px;
    }
}

@media (max-width: 830px){
    .first-elements{
        font-size: 10px;
    }

    .first-elements p{
        font-size: 15px;
    }

    .tareas{
        border: none;
        border-radius: 0px;
    }

    .tareas p {
        font-size: 15px;
    }

    button img {
        width: 15px;
        height: 15px;
    }

    .buttonMas{
      padding: 2px;
    }

    .buttonmodify{
      margin-right: 10px;
    }

  
}
</style>
