<template>
  <div class="flex flex-col lg:flex-row justify-center h-full">
    <div class="flex flex-col h-fit w-full lg:w-2/3 gap-6">
      <PreviewQuiz :quiz="currentQuiz" />
      <ChatBotChatBox />
    </div>
    <div class="w-full lg:w-1/3 mt-8 lg:mt-0 lg:pl-6">
      <NoteList />
    </div>
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import { useChatBotStore } from "~/stores/stores/chatbot";
import { useNoteStore } from "~/stores/stores/note";

definePageMeta({
  layout: "quiz",
});

const route = useRoute();
const { $keycloak, $quizzAppSDK } = useNuxtApp();

onMounted(async () => {
  try {
    await waitForToken();
  } catch (error) {
    console.error("Error waiting for token:", error);
    return;
  }
  try {
    console.log("fetching api")
    useChatBotStore().getMessages({
      textSearch: $quizzAppSDK.config.current_username,
    });

    useQuizStore().getQuiz(route.params.quiz_id as string);
    useNoteStore().getNotes({
      quizzId: route.params.quiz_id as string,
      username: $quizzAppSDK.config.current_username,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {};
});

const currentQuiz = computed(() => {
  return useQuizStore().quiz.find((quiz) => quiz.id === route.params.quiz_id);
});
</script>
