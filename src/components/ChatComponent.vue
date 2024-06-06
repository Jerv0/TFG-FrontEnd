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
    socket = io(`http://${import.meta.env.VITE_RUTA}:3000`, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('partnerJoinedPrivateRoom', (partnerId: string) => {
        if (partnerId !== userId.value) {
            const partnerName = contacts.value.find((contact) => contact.id_usuario === partnerId)?.nombre;
            if (partnerName) {
                toast('success', `${partnerName} ha entrado al chat.`);
                console.log(`(${partnerId}) se ha unido a la sala privada.`);
            }
        }
    });

    socket.on('messageFromPrivateRoom', (message: Message) => {
        if (message.user === partnerId.value) {
            const senderName = contacts.value.find((contact) => contact.id_usuario === message.user)?.nombre;
            toast('info', `Nuevo mensaje de ${senderName}`);
        }
        messages.value.push(message);
    });
    socket.emit('registerUser', userId.value);
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
    socket.emit('sendMessageToPrivateRoom', userId.value, partnerIdValue, messageInput.value);
    messageInput.value = '';
    // Wait for Vue to render the new message
    await nextTick();
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
    <q-btn class="btn-fixed" color="secondary" icon="chat" @click="toggleChat" />

    <div v-if="isChatVisible" class="chat-wrapper">
        <div class="chat-container" :class="{ 'container-dark': $q.dark.isActive }">
            <div class="contacts-section">
                <q-btn class="btn-cerrar" color="accent" label="X" @click="toggleChat" />
                <q-input class="input" type="text" v-model="searchQuery" placeholder="Buscar contactos" v-if="data.usertype !== 'paciente'" />
                <div class="contacts-list" v-if="contacts.length">
                    <q-list>
                        <q-item v-for="contact in filteredContacts" :key="contact.id_usuario" clickable @click="selectPartner(contact.id_usuario)" :class="{ 'selected-contact': contact.id_usuario === partnerId }">
                            <q-item-section>
                                {{ contact.nombre }} {{ contact.apellido }} <b>({{ contact.usertype }})</b>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div v-else>
                    <p>No hay contactos disponibles.</p>
                </div>
            </div>

            <div v-if="partnerId" class="chat-section">
                <h6>Conversación con {{ getName(partnerId) }}</h6>
                <div class="chat-messages" ref="chatContainer" v-if="messages.length">
                    <q-chat-message v-for="(message, index) in messages" :key="index" :text="[message.message]" :sent="message.user === userId" :name="getName(message.user)" />
                </div>
                <div v-else>
                    <h6 class="text-grey q-mt-md">Escribe tu primer mensaje a {{ getName(partnerId) }}!!</h6>
                </div>

                <div class="send-message-section">
                    <q-input v-model="messageInput" filled placeholder="Escribe un mensaje" @keyup.enter="sendMessage" />
                    <q-btn @click="sendMessage" color="primary" class="send-button">Enviar</q-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* Estilo de las barras  */
@import '../assets/variables.scss';

/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: $secondary;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: $secondary;
}

.selected-contact {
    background-color: $secondary;
}
.input {
    padding: 5px;
}

.chat-wrapper {
    width: 100%;
    max-width: 600px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2000;
    background-color: var(--q-bg-page);
    background-color: var(--q-bg-page);
    color: var(--q-text-primary);
}

.chat-container {
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgb(117, 116, 116);
    z-index: 2000;
}
.container-dark {
    background-color: #1c262b;
    box-shadow: 0 1px 5px rgb(117, 116, 116);
}

.contacts-section,
.chat-section {
    width: 100%;
    max-width: 70%;
    margin: 0 auto;
}

.contacts-list {
    max-height: 400px;
    overflow-y: auto;
}

.chat-messages {
    max-height: 350px;
    overflow-x: hidden;
    padding: 20px;
}

.send-message-section {
    display: flex;
    align-items: center;
    gap: 8px;
}

.send-button {
    margin-left: 8px;
}

.btn-fixed-width {
    width: 100px;
    position: fixed;
    z-index: 2001; /* Ensure button is above other elements */
}

.send-message-section {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 7px;
    margin-right: 7px;
    .q-input {
        flex-grow: 1;
    }
    .send-button {
        padding: 10px 20px;
    }
}
@media (min-width: 600px) {
    .chat-container {
        flex-direction: row;
    }
    .contacts-section {
        max-width: 30%;
    }
    .chat-section {
        max-width: 70%;
    }
}
</style>
