<script setup lang="ts">
import { ref } from 'vue';

interface Contact {
    id: number;
    name: string;
    messages: string[];
}

const isChatVisible = ref(true);
const contacts = ref<Contact[]>([
    { id: 1, name: 'John Doe', messages: ['Have you seen Quasar?'] },
    { id: 2, name: 'Jane Smith', messages: ['Already building an app with it...'] },
    // Otros contactos...
]);

const selectedContact = ref<Contact | null>(null);

const toggleChat = () => (isChatVisible.value = !isChatVisible.value);

const openConversation = (contact: Contact) => {
    selectedContact.value = contact;
    console.log('Abriendo conversación con:', contact.name);
};
</script>
<template>
    <!-- Boton encargado de abrir o cerrar el modal , posicionar donde se quiera -->
    <q-btn align="between" class="btn-fixed-width" color="accent" label="Chat" @click="toggleChat" />

    <div v-if="isChatVisible" class="q-pa-md row justify-center absolute-bottom-right container">
        <!-- Lista de contactos -->
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

        <!-- Contenido de la conversación seleccionada -->
        <div v-if="selectedContact" class="col chat q-gutter-x-md">

            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </template>
            </q-chat-message>
            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </template>
            </q-chat-message>
            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </template>
            </q-chat-message>
            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </template>
            </q-chat-message>
            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </template>
            </q-chat-message>
            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar4.jpg" />
                </template>
            </q-chat-message>
            <q-chat-message v-for="(message, index) in selectedContact.messages" :key="index" :text="[message]" :sent="index % 2 === 0" text-color="white" bg-color="primary" class="q-mb-sm">
                <template v-slot:name>me</template>
                <template v-slot:stamp>7 minutes ago</template>
                <template v-slot:avatar>
                    <img class="q-message-avatar q-message-avatar--sent" src="https://cdn.quasar.dev/img/avatar5.jpg" />
                </template>
            </q-chat-message>
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
    width: 450px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 9999;
}
.chat {
    height: 100%;
    overflow-y: auto;
}
.contact {
    border-bottom: 1px solid #ccc;
}
</style>
