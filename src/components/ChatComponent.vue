<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import io from 'socket.io-client';
import { store } from '../store/store';

interface Message {
    user: string;
    message: string;
}
const isChatVisible = ref(true);
const toggleChat = () => (isChatVisible.value = !isChatVisible.value);

interface Contact {
    id: string;
    nombre: string;
}

const userId = ref<string>('');
const partnerId = ref<string>('');
const messageInput = ref<string>('');
const messages = ref<Message[]>([]);
const contacts = ref<Contact[]>([]);
let socket: any;
const data: any = store.getCookie('userData');

onMounted(() => {
    console.log(data.id);
    userId.value = data.id;

    // Connect to Socket.IO server
    socket = io(`http://${import.meta.env.VITE_RUTA}:3000`, { transports: ['websocket', 'polling', 'flashsocket'] });

    // Listen for partner joining private room
    socket.on('partnerJoinedPrivateRoom', (partnerId: string) => {
        console.log(`Tu compañero (${partnerId}) se ha unido a la sala privada.`);
    });

    // Listen for messages from private room
    socket.on('messageFromPrivateRoom', (message: Message) => {
        messages.value.push(message);
    });

    // Send user ID to server
    socket.emit('registerUser', userId.value);

    // Get list of contacts
    getContacts();
});

const getContacts = async () => {
    const response = await store.axiosGet(`https://${import.meta.env.VITE_RUTA}/${import.meta.env.VITE_BACKEND}/userJavi?usertype=admin`);
    contacts.value = response.filter((el: any) => el.username !== data.username);
};

const selectPartner = (partnerIda: string) => {
    partnerId.value = partnerIda;
    socket.emit('joinPrivateRoom', userId.value, partnerId.value);
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

watch(
    messages,
    async () => {
        await nextTick();
        scrollToBottom();
    },
    { deep: true }
);
</script>
<template>
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" @click="toggleChat" />
    <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 500px">
            <div v-if="isChatVisible" class="q-pa-md row justify-center absolute-bottom-right container" :class="{ 'container-dark': $q.dark.isActive }">
                <div class="q-pa-md q-gutter-md">
                    <div class="contacts-list" v-if="contacts.length">
                        <q-list bordered>
                            <q-item v-for="contact in contacts" :key="contact.id" clickable @click="selectPartner(contact.id)">
                                <q-item-section>{{ contact.nombre }}</q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div v-else>
                        <p>No hay contactos disponibles.</p>
                    </div>
                </div>

                <div class="chat-messages q-pa-md q-gutter-md" ref="chatContainer" v-if="messages.length" style="max-height: 300px; overflow-y: auto">
                    <q-chat-message v-for="(message, index) in messages" :key="index" :text="[message.message]" :sent="message.user === userId" :name="message.user === userId ? 'Yo' : message.user" />
                </div>

                <!-- Aquí colocamos el div que contiene el input y el botón -->
                <div class="q-pa-md q-gutter-md" v-if="partnerId">
                    <div class="chat-input q-pa-md">
                        <q-input v-model="messageInput" filled placeholder="Escribe un mensaje" @keyup.enter="sendMessage" />
                    </div>
                    <div class="q-pa-md q-gutter-md">
                        <q-btn @click="sendMessage" color="primary" class="send-button">Enviar</q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.message {
    margin-bottom: 10px;
}

.message-content {
    margin-left: 10px; /* Añade un pequeño margen para separar el nombre de usuario del mensaje */
}

.send-button {
    margin-top: 10px; /* Agrega espacio entre el input y el botón "Enviar" */
}
</style>
