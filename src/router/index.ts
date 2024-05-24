/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import routes from './routes';
import { store } from '../store/store';
import toast from '../utils/formatNotify';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER ? createMemoryHistory : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    //Aqui checkear la autentificacion
    Router.beforeEach((to, from, next) => {
        const data: any = store.getCookie('userData');
        console.log('Navegando a:', to.path);
        console.log('Viniendo de:', from.path);

        if (to.path === '/admin' && data && data.usertype !== 'admin') {
            toast('error', 'Ruta restringida');
            next({ name: 'home' });
        } else if (to.path.startsWith('/ver')) {
            if ((data && data.usertype !== 'admin' && to.path !== '/ver/paciente') || to.path !== '/ver/supervisor') {
                toast('error', 'Ruta restringida');
                next({ name: 'home' });
            } else {
                next();
            }
        } else {
            next();
        }
    });
    return Router;
});
