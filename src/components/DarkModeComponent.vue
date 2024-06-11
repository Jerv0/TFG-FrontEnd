<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Dark } from 'quasar';

const isDark = ref(Dark.isActive);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
};

watch(isDark, (val) => {
    Dark.set(val);
    localStorage.setItem('darkMode', val ? 'true' : 'false');
});

onMounted(() => {
    const userPrefersDark = localStorage.getItem('darkMode') === 'true';
    Dark.set(userPrefersDark);
    isDark.value = Dark.isActive;
});
</script>
<template>
    <q-icon :name="isDark ? 'brightness_3' : 'wb_sunny'" @click="toggleDarkMode" class="cursor-pointer" :color="isDark ? 'white' : 'yellow'" style="font-size: 24px" />
</template>

<style lang="sass" scoped></style>
