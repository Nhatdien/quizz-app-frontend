<template>
  <div class="flex justify-center h-full">
    <div class="flex flex-col h-fit w-full gap-6">
      <PreviewQuiz :quiz="currentQuiz" />
      <ChatBotChatBox />
    </div>
    <div class="w-[30%]">
      <NoteCard />
      {{ useNoteStore().notes }}
    </div>
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import { useNoteStore } from "~/stores/stores/note";

definePageMeta({
  layout: "custom",
});

const route = useRoute();

const { data, error } = useAsyncData("preview-quiz", async () => {
  await useQuizStore().getQuiz(route.params.quiz_id as string);
  await useNoteStore().getNotes({
    quizzId: route.params.quiz_id as string,
  });

  return {};
});

const currentQuiz = computed(() => {
  return useQuizStore().quiz.find((quiz) => quiz.id === route.params.quiz_id);
});
</script>
