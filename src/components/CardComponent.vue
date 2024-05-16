<script setup lang="ts">
const props = defineProps<{
    title: string;
    subtitle: string;
    count: number;
    color: string;
}>();

//primary secondary  accent dark positive negative info warning
//https://quasar.dev/style/color-palette/
</script>

<template>
    <q-card :class="'q-pa-md q-mr-md  q-ml-md q-mt-md bg-' + color" style="max-width: 280px">
        <q-card-section>
            <div class="text-h6 bg">{{ props.title }}</div>
            <div class="text-subtitle1">{{ props.subtitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-h3">{{ props.count }}</div>
        </q-card-section>
    </q-card>
</template>

<style scoped></style>
