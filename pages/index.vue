<template>
  <div>
    <CommonLoadSpinner />
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

onMounted(async () => {

});
</script>
