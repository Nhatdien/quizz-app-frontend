<template>
  <div>
    <h1>Find a quiz </h1>
    <QuizSearchBox />
    <brain/>
    <NuxtPage />
    <CommonUploadFile />
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import QuizSearchBox from "~/components/Quiz/QuizSearchBox.vue";
import brain from "~/assets/icons/brain.vue";

const { $keycloak } = useNuxtApp();
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {

});
</script>
