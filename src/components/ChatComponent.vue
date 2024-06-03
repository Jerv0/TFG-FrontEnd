<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from 'vue';
import io from 'socket.io-client';
import { store } from '../store/store';
import toast from '../utils/formatNotify';
interface Message {
    user: string;
    message: string;
}

interface Contact {
    id_usuario: string;
    nombre: string;
    apellido: string;
    usertype: string;
}

const userId = ref<string>('');
const partnerId = ref<string>('');
const messageInput = ref<string>('');
const messages = ref<Message[]>([]);
const contacts = ref<Contact[]>([]);
const searchQuery = ref('');

let socket: any;
const data: any = store.getCookie('userData');
const dataCustom: any = store.getCookie('userDataCustom');

const isChatVisible = ref(false);
const toggleChat = () => (isChatVisible.value = !isChatVisible.value);

onMounted(() => {
    userId.value = data.id_usuario;

    // Connect to Socket.IO server
    socket = io(`http://${import.meta.env.VITE_RUTA}:3000`, { transports: ['websocket', 'polling', 'flashsocket'] });

    // Listen for partner joining private room
    socket.on('partnerJoinedPrivateRoom', (partnerId: string) => {
        if (partnerId !== userId.value) {
            const partnerName = contacts.value.find((contact) => contact.id_usuario === partnerId)?.nombre;
            if (partnerName) {
                toast('success', `${partnerName} ha entrado al chat.`);
                console.log(`(${partnerId}) se ha unido a la sala privada.`);
            }
        }
    });

    // Listen for messages from private room
    socket.on('messageFromPrivateRoom', (message: Message) => {
        console.log(message);

        if (message.user === partnerId.value) {
            const senderName = contacts.value.find((contact) => contact.id_usuario === message.user)?.nombre;
            toast('info', `Nuevo mensaje de ${senderName}`);
        }
        messages.value.push(message);
    });

    // Send user id_usuario to server
    socket.emit('registerUser', userId.value);

    // Get list of contacts
    getContacts();
});

const getContacts = async () => {
    let response;
    if (data.usertype === 'paciente') {
        response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario&id_usuario=${dataCustom.id_supervisor}`);
    } else {
        //Para que entre en supervisor y admin y tengan todos los contactos
        response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=usuario`);
    }
    contacts.value = response.filter((el: any) => el.username !== data.username);
};

const selectPartner = (receiver: string) => {
    partnerId.value = receiver;
    socket.emit('joinPrivateRoom', userId.value, partnerId.value);
    // Retrieve messages for the selected room
    getMessagesForRoom(receiver);
};

const getMessagesForRoom = async (partnerId: string) => {
    try {
        let response;
        response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=mensaje&id_sala=${partnerId}_${userId.value}`);
        //esto es raro pero es la primera solucion que se me ha venido a la mente , lo que hago es que como se revierte el partner_id
        //y el userId , si no devuelve nada , lo revierto para que si encuentre la sala en la base de datos
        if (response.length === 0) {
            response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}?table=mensaje&id_sala=${userId.value}_${partnerId}`);
        }

        messages.value = response.map((msg: any) => ({ user: msg.user_emisor, message: msg.message }));
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

const chatContainer = ref<HTMLDivElement | null>(null);

const sendMessage = async () => {
    if (!messageInput.value.trim()) return;
    const partnerIdValue = partnerId.value;
    // Send message to server without adding it to the messages array
    socket.emit('sendMessageToPrivateRoom', userId.value, partnerIdValue, messageInput.value);
    messageInput.value = '';
    // Wait for Vue to render the new message
    await nextTick();

    // Scroll to bottom
    scrollToBottom();
};

const scrollToBottom = () => {
    // Scroll to bottom of the chat container
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};
const filteredContacts = computed(() => {
    return contacts.value.filter((contact) => contact.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

watch(
    messages,
    async () => {
        await nextTick();
        scrollToBottom();
    },
    { deep: true }
);
const getName = (id: string) => {
    return userId.value === id ? 'Yo' : contacts.value.find((contact) => contact.id_usuario === id)?.nombre;
};
</script>
<template>
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" @click="toggleChat" />
    <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 700px">
            <div v-if="isChatVisible" class="q-pa-md row justify-center absolute-bottom-right container chat-container" :class="{ 'container-dark': $q.dark.isActive }">
                <div class="contacts-section q-pa-md q-gutter-md">
                    <div class="contacts-list" v-if="contacts.length">
                        <q-list>
                            <q-input type="text" v-model="searchQuery" placeholder="Buscar contactos" v-if="data.usertype === 'supervisor'" />
                            <q-item v-for="contact in filteredContacts" :key="contact.id_usuario" clickable @click="selectPartner(contact.id_usuario)" :class="{ 'selected-contact': contact.id_usuario === partnerId }">
                                <q-item-section
                                    >{{ contact.nombre }} {{ contact.apellido }} <b>({{ contact.usertype }})</b></q-item-section
                                >
                            </q-item>
                        </q-list>
                    </div>
                    <div v-else>
                        <p>No hay contactos disponibles.</p>
                    </div>
                </div>

                <div v-if="partnerId" class="chat-section q-pa-md q-gutter-md">
                    <div class="chat-messages" ref="chatContainer" v-if="messages.length">
                        <q-chat-message v-for="(message, index) in messages" :key="index" :text="[message.message]" :sent="message.user === userId" :name="getName(message.user)" />
                    </div>

                    <div>
                        <q-input v-model="messageInput" filled placeholder="Escribe un mensaje" @keyup.enter="sendMessage" />
                        <q-btn @click="sendMessage" color="primary" class="send-button">Enviar</q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-container {
    width: 100%;
    max-width: 700px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
}
.selected-contact {
    background-color: #c235b6;
    /* Otros estilos que desees */
}
.contacts-section {
    width: 30%;
    border-right: 1px solid #ccc;
}

.chat-section {
    width: 70%;
}

.chat-messages {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding-right: 10px;
}

.chat-input-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.send-button {
    margin-top: 10px;
    margin-left: 10px;
}
</style>
