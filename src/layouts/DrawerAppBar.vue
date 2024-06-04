<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import DarkModeComponent from "../components/DarkModeComponent.vue";

const TITLE = <string>process.env.APP_TITLE;
const leftDrawerOpen = ref<boolean>(false);

import { store } from "../store/store";
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

defineOptions({
  name: "MainLayout",
});

const prueba: any = store.getCookie("userData") || null;

const route = useRoute();
const currentRoute = ref(route.fullPath);
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> {{ TITLE }} </q-toolbar-title>
      <DarkModeComponent />
      <!--   {{ store }}
      {{ store.getCookie("userData") }}
      {{ store.getCookie("userDataCustom") }} -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
    </q-toolbar>
  </q-header>

  <q-drawer
    v-model="leftDrawerOpen"
    v-if="
      currentRoute != '/' &&
      currentRoute != '/Register' &&
      currentRoute != '/Login'
    "
    show-if-above
    bordered
  >
    <!-- Esto se tendria que actualizar con la foto , nombre , etc... de cuando este registrado el usuario -->
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">{{ prueba.nombre }}</div>
        <div>@{{ prueba.username }}</div>
      </div>
    </q-img>

    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <!-- MENU PARA ADMIN O LO QUE SEA -->
      <q-list padding v-if="prueba?.usertype === 'admin'">
        <!-- Aqui tiene que cambiar el 1 por el propio perfil del admin -->

        <q-item-label header> Informacion </q-item-label>
        <q-item clickable v-ripple to="/admin" active-class="my-menu-link"
          ><q-item-section> Inicio </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/candidaturas"
          active-class="my-menu-link"
          ><q-item-section> Candidatos </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/ver/paciente"
          active-class="my-menu-link"
          ><q-item-section> Pacientes </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/ver/supervisor"
          active-class="my-menu-link"
          ><q-item-section> Supervisor </q-item-section>
        </q-item>
        <!-- <q-item v-for="(route, index) in routes" :key="index" clickable v-ripple :to="route.path" active-class="my-menu-link">
                    <q-item-section avatar>
                        <q-icon :name="route.icon" />
                    </q-item-section>
                    <q-item-section> {{ route.title }} </q-item-section>
                </q-item> -->
      </q-list>
      <q-list padding v-if="prueba?.usertype === 'paciente'">
        <q-item clickable v-ripple to="/verDatos">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>

          <q-item-section> Perfil </q-item-section>
        </q-item>

        <!-- <q-item clickable v-ripple to="/conversacion/id">
                    <q-item-section avatar>
                        <q-icon name="drafts" />
                    </q-item-section>

                    <q-item-section>
                        Mensajes
                    </q-item-section>
                    </q-item> -->

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section
            v-if="store.getCookie('userData')"
            v-ripple
            to="/"
            active-class="my-menu-link"
            @click="store.removeCookie('userData')"
          >
            Cerrar sesión
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style>
.my-menu-link {
  color: white;
  background-color: #f2c037;
}

#hola {
  border: 1px solid #000;
}
</style>
