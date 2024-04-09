import { reactive } from 'vue';

/**
 * Tipo que define la estructura esperada para validar contraseñas.
 */
type PasswordValidator = {
    length: boolean;
    capital: boolean;
    number: boolean;
    symbol: boolean;
};

/**
 * Valida si una cadena de texto representa una fecha válida anterior o igual a la fecha actual.
 * @param {string} str - La cadena de texto que se va a validar como fecha.
 * @returns {boolean} true si la cadena de texto representa una fecha válida anterior o igual a la fecha actual, de lo contrario, false.
 */
export const validateDate = (str: string): boolean => {
    return new Date(str) <= new Date();
};

/**
 * Valida si una cadena de texto es un formato de correo electrónico válido.
 * @param {string} email - La cadena de texto que se va a validar como correo electrónico.
 * @returns {boolean} true si la cadena de texto cumple con el formato de correo electrónico válido, de lo contrario, false.
 */
export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Valida si una cadena de texto está presente y no está vacía.
 * @param {string} str - La cadena de texto que se va a validar.
 * @returns {boolean} true si la cadena de texto no está vacía, de lo contrario, false.
 */
export const validateText = (str: string): boolean => {
    return str.trim().length > 0;
};

/**
 * Formatea una cadena de texto capitalizando la primera letra de cada palabra y eliminando espacios adicionales.
 * @param {string} str - La cadena de texto que se formateará.
 * @returns {string} La cadena de texto formateada.
 */
export const formatString = (str: string): string => {
    // Divide la cadena y quita espacios
    const parts: string[] = str.trim().split(/\s+/);
    // Formatea cada palabra recibida
    const formatParts: string[] = parts.map((el) => {
        return el.charAt(0).toUpperCase() + el.slice(1).trim().normalize();
    });
    // Unir las partes formateadas de nuevo en una sola cadena
    return formatParts.join(' ');
};


export const validPassword = reactive(<PasswordValidator>{
    length: false,
    capital: false,
    number: false,
    symbol: false,
});

/**
 * Valida si una cadena cumple con ciertos criterios de complejidad.
 * @param {string} str - La cadena que se va a validar.
 * @returns {boolean} true si la cadena cumple con los criterios , si no, false.
 */
export const validatePassword = (str: string): boolean => {
    // Test length
    validPassword.length = str.length >= 9;
    // Test capital
    validPassword.capital = /^(?=.*[A-Z])/.test(str);
    // Test number
    validPassword.number = /^(?=.*[0-9])/.test(str);
    // Test symbol
    validPassword.symbol = /^(?=.*[!.@#\$%\^&\*_\-=+])/.test(str);
    return validPassword.length && validPassword.capital && validPassword.number && validPassword.symbol;
};
