<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { io, Socket } from 'socket.io-client';

const $q = useQuasar();

interface Contact {
    id: number;
    name: string;
    messages: string[];
}

const isChatVisible = ref(true);
const contacts = ref<Contact[]>([
    { id: 1, name: 'John Doe', messages: ['Have you seen Quasar?', 'holaaa'] },
    { id: 2, name: 'Jane Smith', messages: ['Already building an app with it...'] },
    // Otros contactos...
]);

const selectedContact = ref<Contact | null>(null);
const newMessage = ref<string>('');

const socket: Socket = io('http://18.214.47.239:3000', {
    withCredentials: true,
    extraHeaders: {
        'Access-Control-Allow-Origin': 'http://18.214.47.239:9000', // El mismo origen permitido que en el servidor
    },
});
const messagesContainer = ref<HTMLElement | null>(null);

const toggleChat = () => (isChatVisible.value = !isChatVisible.value);

const openConversation = (contact: Contact) => {
    selectedContact.value = contact;
    console.log('Abriendo conversación con:', contact.name);
};

const sendMessage = async () => {
    if (newMessage.value.trim() !== '' && selectedContact.value) {
        const message = newMessage.value;
        socket.emit('chat message', message);
        selectedContact.value.messages.push(message);
        newMessage.value = '';
        await nextTick();
        scrollToBottom();
    }
};

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
};

onMounted(() => {
    socket.on('chat message', async (msg: string) => {
        if (selectedContact.value) {
            selectedContact.value.messages.push(msg);
            await nextTick();
            scrollToBottom();
        }
    });
});

onBeforeUnmount(() => {
    console.log('me cierro');
    socket.disconnect();
});

watch(selectedContact, async () => {
    await nextTick();
    scrollToBottom();
});
</script>

<template>
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" @click="toggleChat" />

    <div v-if="isChatVisible" class="q-pa-md row justify-center absolute-bottom-right container" :class="{ 'container-dark': $q.dark.isActive }">
        <div class="row justify-end">
            <q-btn class="btn-fixed-width static" color="accent" label="x" @click="toggleChat" />
        </div>
        <div class="col-3 loop float-left">
            <q-list>
                <q-item v-for="contact in contacts" :key="contact.id" clickable @click="openConversation(contact)" class="contact">
                    <q-item-section>
                        <q-item-label>{{ contact.name }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <div v-if="selectedContact" class="col chat q-gutter-x-md">
            <div ref="messagesContainer" class="messages-container">
                <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                    <template v-slot:name>me</template>
                    <template v-slot:stamp>7 minutes ago</template>
                    <template v-slot:avatar>
                        <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                    </template>
                </q-chat-message>
            </div>

            <div class="input-container">
                <q-input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Escribe un mensaje..." />
                <q-btn color="primary" @click="sendMessage">Enviar</q-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
.static {
    position: absolute;
    top: 5px;
    right: 5px;
}
.my-emoji {
    vertical-align: middle;
    height: 2em;
    width: 2em;
}
.loop {
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid #ccc;
}
.container {
    width: 450px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 9999;
    display: flex;
    background-color: white;
}
.container-dark {
    background-color: #1d1d1d;
}
.chat {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
.contact {
    border-bottom: 1px solid #ccc;
}
.messages-container {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 60px; /* Altura del input-container */
}
.input-container {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f9f9f9;
    border-top: 1px solid #ccc;
    position: sticky;
    bottom: 0;
    width: 100%;
}
</style>
