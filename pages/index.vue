<template>
  <div class="flex gap-8 justify-around items-center flex-col">
    <UserAuthSection />
    <LogoSection />
    <JoinRoomInput />
    <QuizSearch />

  </div>
  <CreateQuizSection />
  <NuxtPage />
</template>

<script setup lang="ts">
import UserAuthSection from "~/components/HomePage/UserAuthSection.vue";
import LogoSection from "~/components/HomePage/LogoSection.vue";
import CreateQuizSection from "~/components/HomePage/CreateQuizSection,.vue";
import JoinRoomInput from "~/components/HomePage/JoinRoomInput.vue";
import QuizSearch from "~/components/HomePage/QuizSearch.vue";
import type { Question } from "~/types/quiz";

definePageMeta({
  layout: "custom"
})
const { $keycloak, $quizzAppSDK } = useNuxtApp();
const quizzes = computed(() => {
  return useQuizStore().quiz;
});
                 

onMounted(async () => {
  await waitForToken();
  useQuizStore().getSuggestionQuiz({
    textSearch: $keycloak.getTokenParsed()?.preferred_username,
  });
});
</script>
