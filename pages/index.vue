<template>
  <JoinRoomInput v-if="!useScreen().isLargerThanMedium" />
  <CreateQuizSection />
  <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <QuizCard
      v-for="quiz in quizzes"
      :quiz="quiz"
      :key="quiz?.id"
      @click="navigateTo(`/quiz/${quiz?.id}/view`)" />
  </div> -->

  <div class="font-bold text-xl mb-4 mt-6">Recommended for you:</div>
  <CommonMyCarousel class="" :items="quizzes">
    <template #[`item-component`]="{ item }">
      <QuizCard
        class="w-full h-auto"
        :quiz="item"
        @click="navigateTo(`/quiz/${item?.id}/view`)">
      </QuizCard>
    </template>
  </CommonMyCarousel>
  <NuxtPage />
</template>

<script setup lang="ts">
import QuizCard from "~/components/Quiz/QuizCard.vue";
import CreateQuizSection from "~/components/HomePage/CreateQuizSection,.vue";
import JoinRoomInput from "~/components/HomePage/JoinRoomInput.vue";
import QuizSearch from "~/components/HomePage/QuizSearch.vue";
import type { Question } from "~/types/quiz";
import Quiz from "~/layouts/quiz.vue";

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
