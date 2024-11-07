<template>
  <Button @click="navigateTo('/')">+ Add questions</Button>
  <QuizDetailInfo :quiz="quizzInfo" />
</template>

<script setup lang="ts">
import { quizzes } from "~/stores/test_data";
import { useQuizStore } from "@/stores/stores/quiz";

definePageMeta({
  layout: "custom",
});

const quizzInfo = computed(() => {
  return quizzes.value.find((quiz) => quiz.id === route.params.quiz_id);
});
const route = useRoute();

const quizStore = useQuizStore();
</script>
