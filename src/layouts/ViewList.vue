<script setup lang="ts">
import { useRoute } from 'vue-router';
import DrawerAppBar from './DrawerAppBar.vue';
import TableInfoComponent from 'src/components/TableInfoComponent.vue';
import { computed } from 'vue';

const router = useRoute();

// Usa computed para actualizar path automáticamente cuando cambie la ruta
const path = computed(() => router.fullPath.split('/')[2]);
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <DrawerAppBar ver="admin" />
            <TableInfoComponent :table="path" />
        </q-page-container>
    </q-layout>
</template>

<style></style>
