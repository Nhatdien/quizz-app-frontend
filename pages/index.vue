<template>
  <div>
    <h1 class="text-xl bold">Find a quiz: </h1>

    <QuizSearchBox />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import QuizSearchBox from "~/components/Quiz/QuizSearchBox.vue";

const quizzes = computed(() => {
  return useQuizStore().quiz;
});

const { data: _, status } = await useAsyncData("quiz", async () => {
  const response = await useQuizStore().getQuiz("c85181ddd3a9499d99c5b861288883f3");

  return useQuizStore().quiz
});

onMounted(async () => {

});
</script>
