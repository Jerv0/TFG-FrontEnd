<script setup lang="ts">
import { useRoute } from 'vue-router';
import DrawerAppBar from './DrawerAppBar.vue';
import { ref, watch } from 'vue';
import TableInfoComponent from 'src/components/TableInfoComponent.vue';
const router = useRoute();

const ruta = ref(router.fullPath.split('/')[1]);

watch(router, (to) => {
    ruta.value = to.fullPath.split('/')[1];
});
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            holaa {{ ruta }}
            <DrawerAppBar ver="admin" />
            <TableInfoComponent :table="ruta" />
        </q-page-container>
    </q-layout>
</template>

<style></style>
