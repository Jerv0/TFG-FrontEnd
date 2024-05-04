import { Component } from 'vue';

/**representa la estructura de cada elemento de la ruta */

interface routeElement {
    path: string;
    component: () => Component;
    title?: string;
    icon?: string;
    children?: [{ path: string; component: () => Component }];
    meta?: { [key: string]: string }; 
}

//https://m2.material.io/icons/ de aqui saco iconos

/**todas las rutas de la aplicación: */
const routes: routeElement[] = [
    {
        path: '/',
        component: () => import('components/MainPageComponent.vue'),
        title: 'Main', /**titulo de la ruta */
        icon: 'perm_identity',
    },
    {
        path: '/Register',
        component: () => import('layouts/MainLayout.vue'),
        title: 'Register',
        icon: 'calendar_today',
        children: [{ path: '', component: () => import('components/FormComponent.vue') }],
    },
    {
        path: '/Login',
        component: () => import('layouts/MainLayout.vue'),
        title: 'Login',
        icon: 'account_circle',
        children: [{ path: '', component: () => import('src/components/LoginComponent.vue') }],
    },
    {
        path: '/paciente/id',
        component: () => import ('layouts/ProfileLayout.vue'), 
        meta: {
            profile: 'Paciente' // Establece el perfil como metadato
        },
        children: [{ path: '', component: () => import('src/components/PatientComponent.vue') }],
    },
    {
        path: '/conversacion/id',
        component: () => import('components/ConversationComponent.vue'),
        title: 'Chat',
        icon: 'chat'
    },
    {
        path: '/supervisor/id',
        component: () => import('layouts/ProfileLayout.vue'),
        meta: {
            profile: 'Supervisor'
        }, 
        children: [{ path: '', component: () => import ('src/components/SupervisorComponent.vue')}]
    },
    {
        path: '/admin/id',
        component: () => import('layouts/ProfileLayout.vue'),
        meta: {
            profile: 'Administrador'
        },
        children: [{ path: '', component: () => import ('src/components/AdminComponent.vue')}]
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
