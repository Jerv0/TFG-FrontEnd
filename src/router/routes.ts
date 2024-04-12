import { Component } from 'vue';

interface routeElement {
    path: string;
    component: () => Component;
    title?: string;
    icon?: string;
    children?: [{ path: string; component: () => Component }];
}

//https://m2.material.io/icons/ de aqui saco iconos

const routes: routeElement[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        title: 'Principal',
        icon: 'perm_identity',
        children: [{ path: '', component: () => import('components/MainPageComponent.vue') }],
    },
    {
        path: '/registro',
        component: () => import('layouts/MainLayout.vue'),
        title: 'Registro',
        icon: 'calendar_today',
        children: [{ path: '', component: () => import('components/FormComponent.vue') }],
    },
    {
        path: '/view',
        component: () => import('layouts/MainLayout.vue'),
        title: 'View',
        icon: 'account_circle',
        children: [{ path: '', component: () => import('components/ViewComponent.vue') }],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
