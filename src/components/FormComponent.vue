<script setup lang="ts">
//IMPORTS
import { ref } from 'vue';
import { validateEmail, validateText, validateDate, formatString, validatePassword, validPassword } from '../utils/funcionesValidar';
//VARIABLES
interface Props {
    showForm: boolean;
    type: string;
}

const props = defineProps<Props>();

const name = ref<string>('');
const surname = ref<string>('');
const date = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirm = ref<string>('');

const emit = defineEmits<{
    closeForm: [];
}>();

const closeForm = () => {
    //se puede meter mas codigo
    emit('closeForm');
};

const onReset = () => {
    name.value = '';
    surname.value = '';
    date.value = '';
    email.value = '';
    password.value = '';
    passwordConfirm.value = '';
};
const onSubmit = () => {
    //llamada a enviar los datos
    const datos = {
        name: formatString(name.value),
        surname: formatString(surname.value),
        date: formatString(date.value),
        email: formatString(email.value),
        password: password.value,
    };
    //Llamada a la api / base de datos para subirlo

    console.log(datos);
};
</script>

<template>
    <div class="q-pa-md" style="max-width: 40%">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="name" label="Tu nombre *" hint="Nombre" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
            <q-input filled v-model="surname" label="Apellidos *" hint="Apellidos" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
            <q-input filled type="date" v-model="date" label="Fecha de Nacimiento *" :rules="[(val) => validateDate(val) || 'La fecha de nacimiento no puede ser mayor que la fecha actual']" />
            <q-input filled type="email" v-model="email" label="Email *" :rules="[(val) => validateEmail(val) || 'Tiene que ser un correo permitido']" />
            <q-input type="password" v-model="password" label="Contraseña *" />
            <div class="password-criteria q-pa-sm">
                <div class="text-subtitle2 q-mb-sm">Criterios de Contraseña:</div>
                <div>
                    <q-icon :name="validPassword.length ? 'check_circle' : 'cancel'" :color="validPassword.length ? 'positive' : 'negative'" />
                    Debe tener una longitud de 9 caracteres
                </div>
                <div>
                    <q-icon :name="validPassword.capital ? 'check_circle' : 'cancel'" :color="validPassword.capital ? 'positive' : 'negative'" />
                    Debe contener al menos una mayuscula
                </div>
                <div>
                    <q-icon :name="validPassword.number ? 'check_circle' : 'cancel'" :color="validPassword.number ? 'positive' : 'negative'" />
                    Tiene que contener al menos un numero
                </div>
                <div>
                    <q-icon :name="validPassword.symbol ? 'check_circle' : 'cancel'" :color="validPassword.symbol ? 'positive' : 'negative'" />
                    Debe contener algun caracter especial: !@.#$%^&*()-_+=
                </div>
            </div>
            <q-input label="Confirm Password *" v-model="passwordConfirm" :disable="!validatePassword(password)" type="password" :rules="[(val) => (val && val === password) || 'No coinciden.']"> </q-input>
            <div>
                <q-btn label="Enviar" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </div>
    <div>
        <p>Valor de showForm: {{ props.showForm }}</p>
        <p>Valor de type: {{ props.type }}</p>
        <q-btn align="between" class="btn-fixed-width" color="accent" label="Cerrar Formulario" icon="" @click="closeForm" />
    </div>
</template>

<style>
/* Estilos para tu componente */
.password-criteria {
    background-color: #efefef;
    border-radius: 0.5rem;
}
</style>
