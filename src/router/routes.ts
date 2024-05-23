//Rutas de la aplicacion
const routes = [
    {
        path: '/',
        component: () => import('components/MainPageComponent.vue'),
    },
    {
        path: '/register',
        component: () => import('components/FormComponent.vue'),
    },
    {
        path: '/login',
        component: () => import('src/components/LoginComponent.vue'),
    },
    {
        path: '/paciente/:id',
        component: () => import('src/components/PatientComponent.vue'),
    },
    {
        path: '/conversacion/id',
        component: () => import('components/ConversationComponent.vue'),
    },
    {
        path: '/supervisor/id',
        component: () => import('components/SupervisorComponent.vue'),
    },
    {
        path: '/admin/',
        component: () => import('components/AdminComponent.vue'),
    },
    {
        path: '/ver/:tipo(\\w+)',
        component: () => import('layouts/ViewList.vue'),
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
