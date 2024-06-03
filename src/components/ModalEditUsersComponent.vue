<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import toast from '../utils/formatNotify';
import axios from 'axios';
import { store } from '../store/store';
import { validatePassword, validPassword } from '../utils/funcionesValidar';

const emit = defineEmits(['userUpdated']);
const supervisorOptions = ref<any[]>([]);
const props = defineProps<{
    row: {
        id_usuario: string;
        username: string;
        pass: string;
        email: string;
        dni: string;
        nombre: string;
        apellido: string;
        token: string;
        dir: string;
        tel: string;
        fecha_creacion: string;
        usertype: string;

        contact_emerg: string;
        especialidad_requerida: string;
        medicamentos: string;
        alergias: string;
        id_supervisor: any;

        disponibilidad: string;
        titulacion: string;
        salario: string;
    };
    type: string;
}>();

const open = ref(false);
const form = ref({ ...props.row });
const passwordConfirm = ref<string>(form.value.pass);
const openModal = () => {
    form.value = { ...props.row };
    open.value = true;
};

const onSubmit = async () => {
    try {
        const dataUser = {
            id_usuario: form.value.id_usuario,
            username: form.value.username,
            pass: form.value.pass,
            email: form.value.email,
            dni: form.value.dni,
            nombre: form.value.nombre,
            apellido: form.value.apellido,
            token: form.value.token,
            dir: form.value.dir,
            tel: form.value.tel,
            usertype: form.value.usertype,
        };
        const dataCustom =
            props.type === 'paciente'
                ? {
                      id_usuario: form.value.id_usuario,
                      contact_emerg: form.value.contact_emerg,
                      especialidad_requerida: form.value.especialidad_requerida,
                      medicamentos: form.value.medicamentos,
                      alergias: form.value.alergias,
                      id_supervisor: form.value.id_supervisor.value,
                  }
                : props.type === 'supervisor'
                ? {
                      id_usuario: form.value.id_usuario,
                      disponibilidad: form.value.disponibilidad,
                      titulacion: form.value.titulacion,
                      salario: form.value.salario,
                  }
                : null;

        console.log(dataUser);
        console.log(dataCustom);
        console.log(props.row.id_usuario);
        await store.axiosPut(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${props.row.id_usuario}`, dataUser);
        await store.axiosPut(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=${props.type}&id_usuario=${props.row.id_usuario}`, dataCustom);
        toast('positive', 'Usuario actualizado');
        emit('userUpdated');
        open.value = false;
    } catch (e) {
        console.log(e);
    }
};

const fetchSupervisors = async () => {
    try {
        const response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&usertype=supervisor`);

        supervisorOptions.value = response.map((user: any) => ({
            label: user.nombre + ' ' + user.apellido,
            value: user.id_usuario,
        }));
    } catch (error) {
        console.error('Error fetching supervisors:', error);
    }
};

onMounted(fetchSupervisors);
</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn icon="edit" color="primary" @click="openModal" />

        <q-dialog v-model="open" transition-show="scale" transition-hide="scale">
            <q-card style="max-width: 600px; width: 100%">
                <q-card-section>
                    <div class="text-h6">Editar Usuario</div>
                </q-card-section>

                <q-form @submit.prevent="onSubmit" class="q-gutter-md q-pa-md">
                    <div>
                        <div class="row q-col-gutter-md">
                            <q-input v-model="form.id_usuario" label="ID" disable filled class="col-6" />
                            <q-input v-model="form.username" label="Username" filled class="col-6" />
                            <q-input v-model="form.email" label="Email" type="email" filled class="col-6" />
                            <q-input v-model="form.dni" label="DNI" filled class="col-6" />
                            <q-input v-model="form.nombre" label="Nombre" filled class="col-6" />
                            <q-input v-model="form.apellido" label="Apellido" filled class="col-6" />
                            <q-input v-model="form.token" label="Token" filled class="col-6" disable />
                            <q-input v-model="form.dir" label="Dirección" filled class="col-6" />
                            <q-input v-model="form.tel" label="Teléfono" filled class="col-6" />
                            <q-input v-model="form.fecha_creacion" label="Fecha de Creación" disable filled class="col-6" />
                            <q-input v-model="form.usertype" label="Tipo de Usuario" disable filled class="col-6" />
                        </div>
                        <div class="row q-col-gutter-md">
                            <q-input type="password" v-model="form.pass" label="Contraseña *" filled class="col-6" />
                            <q-input label="Confirm Password *" v-model="passwordConfirm" :disable="!validatePassword(form.pass)" filled class="col-6" type="password" :rules="[(val) => (val && val === form.pass) || 'No coinciden.']"> </q-input>
                            <div class="password-criteria q-pa-sm">
                                <div class="text-subtitle2 q-mb-sm">Criterios de Contraseña:</div>
                                <div><q-icon :name="validPassword.length ? 'check_circle' : 'cancel'" :color="validPassword.length ? 'positive' : 'negative'" />Debe tener una longitud de 9 caracteres</div>
                                <div><q-icon :name="validPassword.capital ? 'check_circle' : 'cancel'" :color="validPassword.capital ? 'positive' : 'negative'" />Debe contener al menos una mayuscula</div>
                                <div><q-icon :name="validPassword.number ? 'check_circle' : 'cancel'" :color="validPassword.number ? 'positive' : 'negative'" />Tiene que contener al menos un numero</div>
                                <div><q-icon :name="validPassword.symbol ? 'check_circle' : 'cancel'" :color="validPassword.symbol ? 'positive' : 'negative'" />Debe contener algun caracter especial: !@.#$%^&*()-_+=</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="props.type === 'paciente'">
                        <div class="row q-col-gutter-md">
                            <q-input v-model="form.contact_emerg" label="Contacto de Emergencia" filled class="col-6" />
                            <q-input v-model="form.especialidad_requerida" label="Especialidad Requerida" filled class="col-6" />
                            <q-input v-model="form.medicamentos" label="Medicamentos" filled class="col-6" />
                            <q-input v-model="form.alergias" label="Alergias" filled class="col-6" />
                            <q-select required v-model="form.id_supervisor" :options="supervisorOptions" label="Seleccione un supervisor" filled class="col-6" selected />
                        </div>
                    </div>

                    <div v-if="props.type === 'supervisor'">
                        <div class="row q-col-gutter-md">
                            <q-input v-model="form.disponibilidad" label="Disponibilidad" filled class="col-6" />
                            <q-input v-model="form.titulacion" label="Titulacion" filled class="col-6" />
                            <q-input v-model="form.salario" label="Salario" filled class="col-6" />
                        </div>
                    </div>
                    <div class="row justify-end q-gutter-sm q-mt-md">
                        <q-btn type="submit" label="Guardar" color="primary" />
                        <q-btn label="Cerrar" color="secondary" flat v-close-popup />
                    </div>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>

<style scoped>
.q-pa-md {
    padding: 1rem;
}

.q-dialog__inner {
    max-width: 600px;
    width: 100%;
}
</style>
