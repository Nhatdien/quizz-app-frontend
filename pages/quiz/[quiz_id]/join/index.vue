<template>
  <div class="flex flex-col gap-8 lg:flex-row justify-center h-full">
    <div class="flex flex-col h-fit w-full lg:w-2/3 gap-6">
      <PreviewQuiz :quiz="currentQuiz" />
      <ChatBotChatBox />
    </div>
    <div
      class="review-item w-full flex flex-col gap-4 justify-self-center lg:w-1/3 mt-8 lg:mt-0 lg:pl-6">
      <div class="bg-[#9FE7FF2a] shadow-md rounded-sm p-4 relative">
        <div class="info-pin"></div>
        <ScrollArea class="h-96">
          <NoteList />
        </ScrollArea>
      </div>

      <QuizAttempts />
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

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = ""; // This is required for some browsers to show the confirmation dialog
};

onMounted(async () => {
  window.addEventListener("beforeunload", handleBeforeUnload);

  try {
    await waitForToken();
  } catch (error) {
    console.error("Error waiting for token:", error);
    return;
  }
  try {
    console.log("fetching api");
    useChatBotStore().getMessages({
      textSearch: $quizzAppSDK.config.current_username,
      pageSize: 20,
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

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const currentQuiz = computed(() => {
  return useQuizStore().quiz.find((quiz) => quiz.id === route.params.quiz_id);
});
</script>
