<script setup lang="ts">
import { store } from '../store/store';

const removeCookies = () => {
    store.removeCookie('userData');
    store.removeCookie('userDataCustom');
};
</script>

<template><q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar sesión" to="/" @click="removeCookies()" /></template>

<style lang="sass" scoped></style>
