import { reactive } from 'vue';

export const store = reactive({
    type: <string>'prueba',

    prueba() {
        console.log('hola');
    },
});
