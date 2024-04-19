import { Component } from 'vue';

/**representa la estructura de cada elemento de la ruta */
interface routeElement {
    path: string;
    component: () => Component;
    title?: string;
    icon?: string;
    children?: [{ path: string; component: () => Component }];
}

//https://m2.material.io/icons/ de aqui saco iconos

/**todas las rutas de la aplicación: */
const routes: routeElement[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        title: 'Main', /**titulo de la ruta */
        icon: 'perm_identity',
        children: [{ path: '', component: () => import('components/MainPageComponent.vue') }], /**rutas secundarias */
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
        component: () => import('src/components/PatientComponent.vue'),
    },
    {
        path: '/conversacion/id',
        component: () => import('components/ConversationComponent.vue')
    },
    {
        path: '/supervisor/id',
        component: () => import('components/SupervisorComponent.vue')
    },
    {
        path: '/admin/id',
        component: () => import('components/AdminComponent.vue')
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
