<script setup lang="ts">
// IMPORTS
import { ref } from 'vue';
import toast from '../utils/formatNotify';
import { validateEmail, validateText, validateDate, formatString, validatePassword, validPassword } from '../utils/funcionesValidar';
import { store } from '../store/store';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';

// VARIABLES DE ENTORNO
const CUIDADOR = <string>process.env.CUIDADOR;

// VARIABLES DEL COMPONENTE
const name = ref<string>('');
const surname = ref<string>('');
const date = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirm = ref<string>('');
const file = ref<File>();
const phoneNumber = ref<string>('');

// MÉTODOS
const emit = defineEmits<{
    closeForm: [];
}>();

const closeForm = () => {
    emit('closeForm');
};

const onReset = () => [name, surname, date, email, password, passwordConfirm, phoneNumber].forEach((field) => (field.value = ''));

const onSubmit = () => {
    // Llamada a enviar los datos
    const datos = {
        name: formatString(name.value),
        surname: formatString(surname.value),
        date: formatString(date.value),
        email: formatString(email.value),
        password: password.value,
        phoneNumber: phoneNumber.value,
    };

    // Quizás un post a la máquina para guardar el archivo (?)
    console.log(file.value);

    // Llamada a la API/base de datos para subirlo
    console.log(datos);

    toast('positive', 'Formulario Enviado');

    closeForm();
};

const onRejected = () => toast('negative', 'Archivo no válido');
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <div class="form-container q-pa-md">
                <DrawerAppBar />
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <q-input filled v-model="name" label="Tu nombre *" hint="Nombre" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                    <q-input filled v-model="surname" label="Apellidos *" hint="Apellidos" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                    <q-input filled type="date" v-model="date" label="Fecha de Nacimiento *" :rules="[(val) => validateDate(val) || 'La fecha de nacimiento no puede ser mayor que la fecha actual']" />
                    <q-input filled type="email" v-model="email" label="Email *" :rules="[(val) => validateEmail(val) || 'Tiene que ser un correo permitido']" />
                    <q-input filled v-model="phoneNumber" label="Número de Teléfono" mask="###-###-###" unmasked-value />
                    <q-input type="password" v-model="password" label="Contraseña *" />
                    <div class="password-criteria q-pa-sm">
                        <div class="text-subtitle2 q-mb-sm">Criterios de Contraseña:</div>
                        <div><q-icon :name="validPassword.length ? 'check_circle' : 'cancel'" :color="validPassword.length ? 'positive' : 'negative'" />Debe tener una longitud de 9 caracteres</div>
                        <div><q-icon :name="validPassword.capital ? 'check_circle' : 'cancel'" :color="validPassword.capital ? 'positive' : 'negative'" />Debe contener al menos una mayúscula</div>
                        <div><q-icon :name="validPassword.number ? 'check_circle' : 'cancel'" :color="validPassword.number ? 'positive' : 'negative'" />Tiene que contener al menos un número</div>
                        <div><q-icon :name="validPassword.symbol ? 'check_circle' : 'cancel'" :color="validPassword.symbol ? 'positive' : 'negative'" />Debe contener algún carácter especial: !@.#$%^&*()-_+=</div>
                    </div>
                    <q-input label="Confirmar Contraseña *" v-model="passwordConfirm" :disable="!validatePassword(password)" type="password" :rules="[(val) => (val && val === password) || 'No coinciden.']" />

                    <div v-if="store.type === CUIDADOR">
                        <q-file v-model="file" filled label="Seleccionar archivo PDF" max-files="1" accept=".pdf" @rejected="onRejected" max-file-size="4096" />
                    </div>

                    <div class="form-actions">
                        <q-btn label="Enviar" type="submit" color="primary" />
                        <q-btn color="accent" label="Cerrar" icon="" @click="closeForm" to="/" />
                    </div>
                </q-form>
            </div>
        </q-page-container>
    </q-layout>
</template>

<style scoped lang="scss">
.form-container {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
}

.password-criteria {
    background-color: #efefef;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-fixed-width {
    width: 100%;
    margin-top: 1rem;
}

.q-input,
.q-file {
    margin-bottom: 1rem;
}

.q-btn {
    width: 48%;
}
</style>
