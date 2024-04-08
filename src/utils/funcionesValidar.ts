export const validateDate = (str: string): boolean => {
    return new Date(str) <= new Date();
};

export const validateEmail = (email: string): boolean => {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
};

export const validateText = (str: string): boolean => {
    return str && str.length > 0 ? true : false;
};

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

// https://medium.com/@bklik/form-validation-with-quasar-framework-and-the-vue-js-composition-api-9c67f8536abd 
//mirar para el formateo de contraseñas y enseñar bien los errores