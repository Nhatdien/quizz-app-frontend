<template>
    <div class="chatbox">
        <div class="chatbox-header">
            <h3>ChatBox</h3>
        </div>
        <div class="chatbox-messages">
            <div v-for="(message, index) in messages" :key="index" class="message">
                <span :class="message.sender + ' paper rounded'">{{ message.text }}</span>
            </div>
        </div>
        <div class="chatbox-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const messages = ref([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
    { sender: 'user', text: 'I need some information about your services.' },
    { sender: 'bot', text: 'Sure! We offer a variety of services including web development, mobile app development, and more.' }
]);

const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
        messages.value.push({ sender: 'user', text: newMessage.value });
        newMessage.value = '';
        // Simulate bot response
        setTimeout(() => {
            messages.value.push({ sender: 'bot', text: 'Thank you for your message. We will get back to you shortly.' });
        }, 1000);
    }
};
</script>

<style scoped>
.chatbox {
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: Arial, sans-serif;
}

.chatbox-header {
    background-color: #007bff;
    color: white;
    padding: 10px;
    text-align: center;
}

.chatbox-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #f9f9f9;
}

.message {
    margin-bottom: 10px;
    display: flex;
}

.message .bot {
    background-color: #e1f5fe;
    color: #0277bd;
    padding: 8px;
    border-radius: 8px;
    max-width: 70%;
}

.message .user {
    background-color: #c8e6c9;
    color: #388e3c;
    padding: 8px;
    border-radius: 8px;
    max-width: 70%;
    margin-left: auto;
}

.chatbox-input {
    display: flex;
    border-top: 1px solid #ccc;
    padding: 10px;
    background-color: #fff;
}

.chatbox-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
}

.chatbox-input button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.chatbox-input button:hover {
    background-color: #0056b3;
}
</style>
