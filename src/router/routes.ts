//Rutas de la aplicacion
const routes = [
    {
        name: 'home',
        path: '/',
        component: () => import('components/MainPageComponent.vue'),
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('components/FormComponent.vue'),
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('src/components/LoginComponent.vue'),
    },
    {
        name: 'paciente',
        path: '/paciente',
        component: () => import ('src/components/PatientComponent.vue'),
        // children: [{ path: '/paciente', component: () => import('src/components/PatientComponent.vue') }]
    },
    {
        name: 'hola',
        path: '/conversacion/:id',
        component: () => import('components/ConversationComponent.vue'),
    },
    {
        name: 'supervisor',
        path: '/supervisor',
        component: () => import('src/components/SupervisorComponent.vue'),
    },
    {
        path: '/revisionTareas',
        component: () => import('components/ReviewTareas.vue')
    },
    {
        path: '/creacionTareas',
        component: () => import('components/CreateTareas.vue')
    },
    {
        name: 'admin',
        path: '/admin',
        component: () => import('components/AdminComponent.vue'),
    },
    {
        path: '/ver/:tipo(\\w+)',
        component: () => import('layouts/ViewList.vue'),
    },
    {
        name: 'candidatos',
        path: '/candidaturas',
        component: () => import('components/ApplicantInfoComponent.vue'),
    },
    {
        name: 'modificarDatos',
        path: '/verDatos',
        component: () => import ('src/components/ModifyDataProfile.vue'),
    },
    {
        name: 'bloqueado',
        path: '/bloqueado',
        component: () => import('components/ApplicantInfoComponent.vue'),
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
