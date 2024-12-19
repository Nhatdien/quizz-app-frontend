<template>
  <div class="flex gap-8 justify-around items-center flex-col">
    <UserAuthSection />
    <LogoSection />
    <JoinRoomInput />
    <QuizSearch />
  </div>
  <CreateQuizSection />
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <QuizCard
      v-for="quiz in quizzes"
      :quiz="quiz"
      :key="quiz?.id"
      @click="navigateTo(`/quiz/${quiz?.id}/view`)" />
  </div>
  <NuxtPage />
</template>

<script setup lang="ts">
import UserAuthSection from "~/components/HomePage/UserAuthSection.vue";
import LogoSection from "~/components/HomePage/LogoSection.vue";
import QuizCard from "~/components/Quiz/QuizCard.vue";
import CreateQuizSection from "~/components/HomePage/CreateQuizSection,.vue";
import JoinRoomInput from "~/components/HomePage/JoinRoomInput.vue";
import QuizSearch from "~/components/HomePage/QuizSearch.vue";
import type { Question } from "~/types/quiz";

definePageMeta({
  layout: "custom",
});
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
