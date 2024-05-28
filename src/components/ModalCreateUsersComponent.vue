<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import toast from '../utils/formatNotify';
import { store } from '../store/store';
import { uid } from 'quasar';
import { validateEmail, validateText, validatePassword, validPassword } from '../utils/funcionesValidar';
const emit = defineEmits(['userUpdated']);
const passwordConfirm = ref<string>('');
const supervisorOptions = ref<any[]>([]);

const form = ref({
    username: '',
    pass: '',
    mail: '',
    dni: '',
    nombre: '',
    apellido: '',
    dir: '',
    tel: '',
    usertype: '',

    contact_emerg: '',
    especialidad_requerida: '',
    medicamentos: '',
    alergias: '',
    id_supervisor: { value: '', label: '' },

    disponibilidad: '',
    titulacion: '',
    salario: '',
});

const open = ref(false);

const openModal = () => {
    open.value = true;
};

const onSubmit = async () => {
    const dataUser = {
        id: uid(),
        username: form.value.username,
        pass: form.value.pass,
        email: form.value.mail,
        dni: form.value.dni,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        dir: form.value.dir,
        tel: form.value.tel,
        usertype: form.value.usertype,
    };

    const dataCustom =
        form.value.usertype === 'paciente'
            ? {
                  id: dataUser.id,
                  contact_emerg: form.value.contact_emerg,
                  especialidad_requerida: form.value.especialidad_requerida,
                  medicamentos: form.value.medicamentos,
                  alergias: form.value.alergias,
                  id_supervisor: form.value.id_supervisor.value,
              }
            : form.value.usertype === 'supervisor'
            ? {
                  id: dataUser.id,
                  disponibilidad: form.value.disponibilidad,
                  titulacion: form.value.titulacion,
                  salario: form.value.salario,
              }
            : null;

    console.log(dataUser);
    console.log(dataCustom);

    await store.axiosPost(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi`, dataUser);
    //Hay que hacer que haga el post al endpoint necesario , ahora mismo solo hace el post a pacientes
    await store.axiosPost(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/pacienteJavi`, dataCustom);

    emit('userUpdated');
    toast('positive', 'Usuario Creado');
    clearFields();
    open.value = false;
};

const clearFields = () => {
    form.value = {
        username: '',
        pass: '',
        mail: '',
        dni: '',
        nombre: '',
        apellido: '',
        dir: '',
        tel: '',
        usertype: '',

        contact_emerg: '',
        especialidad_requerida: '',
        medicamentos: '',
        alergias: '',
        id_supervisor: { value: '', label: '' },

        disponibilidad: '',
        titulacion: '',
        salario: '',
    };
};

const fetchSupervisors = async () => {
    try {
        const response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?usertype=supervisor`);
        supervisorOptions.value = response.map((user: any) => ({
            label: user.nombre + ' ' + user.apellido,
            value: user.id,
        }));
    } catch (error) {
        console.error('Error fetching supervisors:', error);
    }
};

onMounted(fetchSupervisors);
</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn icon="add" color="primary" @click="openModal" />

        <q-dialog v-model="open" transition-show="scale" transition-hide="scale">
            <q-card style="max-width: 600px; width: 100%">
                <q-card-section>
                    <div class="text-h6">Añadir Usuario</div>
                </q-card-section>

                <q-form @submit.prevent="onSubmit" class="q-gutter-md q-pa-md">
                    <div>
                        <div class="row q-col-gutter-md">
                            <q-input v-model="form.username" label="Username" filled class="col-6" required :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.mail" label="Email" type="email" filled class="col-6" required :rules="[(val) => validateEmail(val) || 'Tiene que ser un correo permitido']" />
                            <q-input v-model="form.dni" label="DNI" filled class="col-6" required />
                            <q-input v-model="form.nombre" label="Nombre" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.apellido" label="Apellido" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.dir" label="Dirección" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.tel" label="Telefono" mask="###-###-###" unmasked-value filled class="col-6" />
                            <q-select v-model="form.usertype" :options="['paciente', 'supervisor']" label="Tipo de Usuario" filled class="col-6" />
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

                    <div v-if="form.usertype === 'paciente'">
                        <div class="row q-col-gutter-md">
                            <q-input v-model="form.contact_emerg" label="Contacto de Emergencia" mask="###-###-###" unmasked-value filled class="col-6" />
                            <q-input v-model="form.especialidad_requerida" label="Especialidad Requerida" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.medicamentos" label="Medicamentos" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.alergias" label="Alergias" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-select v-model="form.id_supervisor" :options="supervisorOptions" label="Seleccione un supervisor" filled class="col-6" selected />
                        </div>
                    </div>

                    <div v-if="form.usertype === 'supervisor'">
                        <div class="row q-col-gutter-md">
                            <q-input v-model="form.disponibilidad" label="Disponibilidad" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.titulacion" label="Titulacion" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="form.salario" label="Salario" filled class="col-6" type="number" suffix="€" />
                        </div>
                    </div>

                    <div class="row justify-end q-gutter-sm q-mt-md">
                        <q-btn v-if="form.usertype" type="submit" label="Guardar" color="primary" />
                        <q-btn label="Cerrar" color="secondary" flat v-close-popup @click="clearFields()" />
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
