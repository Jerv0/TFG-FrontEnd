<script setup lang="ts">
import { ref } from 'vue';
import routes from '../router/routes';
import { useRoute } from 'vue-router';
import { store } from '../store/store';


defineOptions({
    name: 'MainLayout',
});

routes.pop();
 
const drawer = ref<boolean>(false); 

const route = useRoute();
// const profile = route.meta.profile;
let path = route.fullPath;
let data: any = store.getCookie('userData');


</script>

<template>
    <q-layout view="hHh lpR fFf">
      
      <q-header elevated class="bg-cyan-8">
      
            <q-toolbar>
              <!-- <q-toolbar-title>Perfil de {{ profile}}</q-toolbar-title> -->
                <q-toolbar-title>Bienvenido {{ data.username }}</q-toolbar-title>
                <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding >
            <q-item clickable v-ripple :to="path">
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>
                Perfil
              </q-item-section>
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

              <q-item-section v-if="store.getCookie('userData')" v-ripple to="/" active-class="my-menu-link" @click="store.removeCookie('userData')">
                Cerrar sesión
              </q-item-section>

            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </div>
        </q-img>
      </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style>
</style>

