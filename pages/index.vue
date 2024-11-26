<template>
  <div>
    <h1 class="text-3xl font-bold">Find a quiz: </h1>
    <QuizSearchBox />
    <NuxtPage />
    <CommonUploadFile />
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import QuizSearchBox from "~/components/Quiz/QuizSearchBox.vue";

const { $keycloak } = useNuxtApp();
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {

});
</script>
