<template>
  <Button @click="navigateTo('/')">Go back home</Button>
  <QuizDetailInfo :quiz="quizzInfo" />
</template>

<script setup lang="ts">
import type { Quiz } from '~/types/quiz';


definePageMeta({
  layout: "custom",
});

const quizzInfo = computed(() => {
  return useQuizStore().quiz.find((quiz) => quiz.id === route.params.quiz_id) as Record<string, unknown>;
});
const route = useRoute();

const quizStore = useQuizStore();
</script>
