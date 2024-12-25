<template>
  <CommonMyDrawer
    title="Ask A.I for some helps"
    description="Please enter your question below">
    <template #trigger>
      <Input placeholder="Feeling struggled? Ask A.I for some helps" />
    </template>
    <!--
    <template #submit>
      <button @click="submitAddComment">Add Comment</button>
    </template>
    <template #cancel>
      <button @click="currentState.addComment = false">Cancel</button>
    </template> -->
    <div class="chatbox">
      <div class="chatbox-header">
        <h3>ChatBox</h3>
      </div>
      <ScrollArea @scroll-top="onScrollTop" ref="scrollAreaRef" class="h-96">
        <div class="chatbox-messages">
          <div
            v-for="(message, index) in currentMessages"
            :key="index"
            class="message">
            <span :class="message.sender + ' paper rounded'">{{
              message.text
            }}</span>
          </div>
        </div>
      </ScrollArea>
      <div class="chatbox-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..." />
        <Button :disabled="newMessage.trim() === ''" @click="sendMessage">
          Send
        </Button>
      </div>
    </div>
  </CommonMyDrawer>
</template>

<script setup lang="ts">
import type { MessageModel, BaseContent } from "~/types/chatbot";
import { useScroll } from "@vueuse/core";

const { $quizzAppSDK } = useNuxtApp();
const currentMessages = computed(() => {
  return useChatBotStore().messages.map((message: BaseContent) => {
    return {
      sender: message.role === "model" ? "bot" : "user",
      text: message.parts[0].text,
    };
  });
});

const pageSize = ref(20);

const onScrollTop = () => {
  pageSize.value += 20;

  useChatBotStore().getMessages({
    textSearch: $quizzAppSDK.config.current_username,
    pageSize: pageSize.value,
  });
};

// useChatBotStore().getMessages({
//       textSearch: $quizzAppSDK.config.current_username,
//       pageSize: 10,
//     });

const { $keycloak } = useNuxtApp();

const newMessage = ref("");

const sendMessage = async () => {
  if (newMessage.value.trim() === "") {
    return;
  }

  
  const inputMessageToBot = {
    role: "user",
    parts: [
      {
        text: newMessage.value + ", answer shortly in below 50 words",
      },
    ],
  };

  const saveInputMessagePayload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: newMessage.value,
          },
        ],
      },
    ],
  };
  const messageSend = {
    contents: [inputMessageToBot],
  };
  newMessage.value = "";
  await useChatBotStore().saveMessage(saveInputMessagePayload);
  const responseMessage = await useChatBotStore().sendMessage(messageSend);
  const saveMessagePayload = responseMessage.candidates[0].content;
  console.log(saveMessagePayload);
  await useChatBotStore().saveMessage({
    contents: [saveMessagePayload],
  });
};

// onMounted(() => {
//   const response = useChatBotStore().getMessages({
//     textSearch: $keycloak.getTokenParsed()?.preferred_username,
//   });
//   console.log(response);
// });
</script>

<style scoped>
.chatbox {
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
}

.chatbox-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
}

.chatbox-messages {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  min-height: 24rem;
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
  padding: 20px 20px;
  background-color: #007bff;
  color: white;
  margin: 0 auto;
  border: none;

  border-radius: 4px;
  cursor: pointer;
}

.chatbox-input button:hover {
  background-color: #0056b3;
}

/* Responsive styles */
@media (max-width: 768px) {
  .chatbox {
    border-radius: 0;
  }

  .chatbox-header {
    padding: 8px;
  }

  .chatbox-messages {
    padding: 8px;
  }

  .message .bot,
  .message .user {
    max-width: 100%;
  }

  .chatbox-input {
    flex-direction: column;
  }

  .chatbox-input input {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .chatbox-input button {
    width: 100%;
  }
}
</style>
