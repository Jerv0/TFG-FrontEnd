/* eslint-disable @typescript-eslint/no-explicit-any */
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
    addCookie(name: string, value: any) {
        cookies.set(name, value);
    },
    getAllCookies() {
        return cookies.keys();
    },
    syncDataUser(nameCookie: string) {
        this.dataUser.value = cookies.get(nameCookie);
    },
});
