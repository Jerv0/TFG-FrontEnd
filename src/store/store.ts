/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

export const store = reactive({
    type: <string>'prueba',

    dataUser: <any>ref({}),
    getCookie(name: string) {
        return cookies.get(name);
    },
    removeCookie(name: string) {
        cookies.remove(name);
    },
    addCookie(name: string, value: any, time = '4h') {
        cookies.set(name, value, time);
    },
    getAllCookies() {
        return cookies.keys();
    },
    syncDataUser(nameCookie: string) {
        this.dataUser.value = cookies.get(nameCookie);
    },

    async fetchCount(url: string, time = 0.3) {
        try {
            await new Promise((resolve) => setTimeout(resolve, time * 1000));
            const response = await axios.get(url);
            return response.data.usuarios.length;
        } catch (error) {
            throw new Error(`Error fetching count: ${error}`);
        }
    },
    async axiosGetWithTimeout(url: string, time = 0.3) {
        try {
            await new Promise((resolve) => setTimeout(resolve, time * 1000));
            const response = await axios.get(url);
            return response.data.usuarios;
        } catch (error) {
            throw new Error(`Error al obtener los datos: ${error}`);
        }
    },
    async axiosGet(url: string) {
        try {
            const response = await axios.get(url);
            return response.data.usuarios;
        } catch (e) {
            throw new Error(`Error al obtener los datos: ${e}`);
        }
    },
    async axiosPost(url: string, data: any) {
        try {
            await axios.post(url, data);
        } catch (e) {
            throw new Error(`Error al meter los datos: ${e}`);
        }
    },
    async axiosPut(url: string, data: any) {
        try {
            await axios.put(url, data);
        } catch (e) {
            throw new Error(`Error al actualizar los datos: ${e}`);
        }
    },
    async axiosDelete(url: string) {
        try {
            await axios.delete(url);
        } catch (e) {
            throw new Error(`Error al borrar los datos: ${e}`);
        }
    },
});
