<script setup lang="ts">

//VARIABLES
interface Props {
    showForm: boolean;
    type: string;
}

const props = defineProps<Props>();


const emit = defineEmits<{
    closeForm: [],
}>()

const closeForm = () => {
    //se puede meter mas codigo
    emit('closeForm')
}
</script>

<template>
    <div>
        <p>Valor de showForm: {{ props.showForm }}</p>
        <p>Valor de type: {{ props.type }}</p>
        <q-btn
            align="between"
            class="btn-fixed-width"
            color="accent"
            label="Cerrar Formulario"
            icon=""
            @click="closeForm"
        />
    </div>
</template>

<style>
/* Estilos para tu componente */
</style>
