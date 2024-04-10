import { QVueGlobals, Notify } from 'quasar';
//Wiki https://quasar.dev/quasar-plugins/notify#introduction

/**
 * Muestra una notificación de tipo toast.
 * @param {QVueGlobals} q - Objeto QVueGlobals para mostrar la notificación.
 * @param {string} type - Tipo de la notificación info | positive | warning | negative | ongoing).
 * @param {string} message - Mensaje que se mostrará en la notificación.
 */
export const toastRaro = (q: QVueGlobals, type: string, message: string) => {
    q.notify({
        type: type,
        message: message,
    });
};

/**
 * Muestra una notificación (toast) con el mensaje especificado.
 * @param {string} tipo - El tipo de la notificación (por ejemplo, 'success', 'warning', 'error').
 * @param {string} mensaje - El mensaje que se mostrará en la notificación.
 * @param {number} [time=3] - La duración de la notificación en segundos (opcional, por defecto 3 segundos).
 * @returns {void}
 */
export const toast = (tipo: string, mensaje: string, time = 3) => {
    const opciones = {
        message: mensaje,
        color: tipo,
        timeout: time * 1000,
    };
    // Muestra la notificación
    Notify.create(opciones);
};
