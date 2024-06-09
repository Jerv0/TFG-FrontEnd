<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts"> 
import {ref, onMounted} from 'vue'
import {store} from '../store/store'
import axios from 'axios'
import { validateEmail, validateText} from '../utils/funcionesValidar';
import DrawerAppBar from '../layouts/DrawerAppBar.vue';
import toast from '../utils/formatNotify';

let data: any = store.getCookie('userData');

let id_usuario = data.id_usuario
let username = ref<string>('')
let pass = ref<string>('')
let email = ref<string>('')
let dni = ref<string>('')
let nombre = ref<string>('')
let apellido = ref<string>('')
let token = ref<string>('')
let dir = ref<string>('')
let tel = ref<string>('')
let usertype = ref<string>('')
let fecha_creacion = ref()

const importarUsuarios= async () => {
  try {
    const response = await axios.get(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${id_usuario}`);
    username.value = response.data.usuarios[0].username;
    pass.value = response.data.usuarios[0].pass;
    email.value = response.data.usuarios[0].email;
    dni.value = response.data.usuarios[0].dni;
    nombre.value = response.data.usuarios[0].nombre;
    apellido.value = response.data.usuarios[0].apellido;
    token.value = response.data.usuarios[0].token;
    dir.value = response.data.usuarios[0].dir;
    tel.value = response.data.usuarios[0].tel;
    fecha_creacion.value = response.data.usuarios[0].fecha_creacion;
    usertype.value = response.data.usuarios[0].usertype;

  } catch (error) {
    console.log('error', 'Error de conexión');
  }
};

const onSubmit = async () => {
    try {
        const dataUser = {
            id_usuario: data.id_usuario,
            username: username.value,
            pass: pass.value,
            email: email.value,
            dni: dni.value,
            nombre: nombre.value,
            apellido: apellido.value,
            token: token.value,
            dir: dir.value,
            tel: tel.value,
            fecha_creacion: fecha_creacion.value,
            usertype: usertype.value,
        };


        await axios.put(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${data.id_usuario}`, dataUser);
        
        store.updateCookie('userData', dataUser)
        toast('positive', 'Usuario actualizado');
    } catch (e) {
        console.log(e);
    }
};

onMounted(() => {
  importarUsuarios();
});

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <DrawerAppBar/>
        <q-page-container>
           <h4>Datos personales de {{username}} </h4>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md q-pa-md">
                    <q-form>
                        <div class="row q-col-gutter-md">
                            <q-input v-model="username" label="Username" filled class="col-6" required :rules="[(val) => validateText(val) || 'Rellena correctamente']" />
                            <q-input v-model="pass" label="Contraseña" type="password" filled class="col-6" required/>
                            <q-input v-model="email" label="Email" type="email" filled class="col-6" required :rules="[(val) => validateEmail(val) || 'Tiene que ser un correo permitido']"/>
                            <q-input v-model="dni" label="DNI" disable filled class="col-6" />
                            <q-input v-model="nombre" label="Nombre" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']"/>
                            <q-input v-model="apellido" label="Apellido" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']"/>
                            <q-input v-model="dir" label="Dirección" filled class="col-6" :rules="[(val) => validateText(val) || 'Rellena correctamente']"/>
                            <q-input v-model="tel" label="Teléfono" filled class="col-6" />
                            <q-input v-model="usertype" label="Tipo de Usuario" disable filled class="col-6"/>
                        </div>
                    </q-form>
                    <div class="row justify-end q-gutter-sm q-mt-md">
                        <q-btn type="submit" label="Guardar" color="primary"/>
                        <q-btn label="Cerrar" color="secondary" to="/paciente" />
                    </div>
            </q-form>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
h4{
    text-align: center;
    font-family: Georgia, 'Times New Roman', Times, serif;

}
</style>

