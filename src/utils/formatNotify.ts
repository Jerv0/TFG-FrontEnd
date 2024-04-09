import { QVueGlobals } from 'quasar';
//Wiki https://quasar.dev/quasar-plugins/notify#introduction

/**
 * Muestra una notificación de tipo toast.
 * @param {QVueGlobals} q - Objeto QVueGlobals para mostrar la notificación.
 * @param {string} type - Tipo de la notificación info | success | warning | error).
 * @param {string} message - Mensaje que se mostrará en la notificación.
 */
export const toast = (q :QVueGlobals,type: string, message: string) => {
    q.notify({
        type: type,
        message: message,
    });
};
