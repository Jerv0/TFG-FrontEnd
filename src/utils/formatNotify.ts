import { Notify } from 'quasar';
//Wiki https://quasar.dev/quasar-plugins/notify#introduction
/**
 * Muestra una notificación (toast) con el mensaje especificado.
 * @param {string} tipo - El tipo de la notificación (por ejemplo, 'success', 'warning', 'error','info') o cualquier color que queramos "purple".
 * @param {string} mensaje - El mensaje que se mostrará en la notificación.
 * @param {number} [time=3] - La duración de la notificación en segundos (opcional, por defecto 3 segundos).
 * @returns {void}
 */
const toast = (tipo: string, mensaje: string, time = 3) => {
    const opciones = {
        message: mensaje,
        color: tipo,
        timeout: time * 1000,
    };
    // Muestra la notificación
    Notify.create(opciones);
};

export default toast;