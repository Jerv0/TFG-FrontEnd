<script setup lang="ts">
import { store } from '../store/store';
</script>

<template><q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" @click="store.removeCookie('userData')" /></template>

<style lang="sass" scoped></style>
