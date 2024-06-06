<script setup lang="ts">
const props = defineProps<{
    title: string;
    subtitle: string;
    count: unknown;
    color: string;
    url: string;
}>();

// primary, secondary, accent, dark, positive, negative, info, warning
// https://quasar.dev/style/color-palette/
</script>

<template>
    <q-card :class="'q-pa-md q-mt-md bg-' + props.color" style="max-width: 280px">
        <q-card-section>
            <div class="text-h6">{{ props.title }}</div>
            <div class="text-subtitle1">{{ props.subtitle }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-h3">{{ props.count }}</div>
            <q-btn v-if="props.url !== ''" :color="props.color" label="Ver" icon="visibility" :to="props.url" />
        </q-card-section>
    </q-card>
</template>

<style scoped>
.q-card {
    margin: 0 auto; /* Center the card horizontally */
}
</style>
