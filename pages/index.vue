<template>
  <div>
    <h1 class="text-xl bold">Recently taken quizzes:</h1>

    <PreviewQuiz :quiz="quizzes[0]"/>
    <QuizSearchBox />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import QuizSearchBox from "~/components/Quiz/QuizSearchBox.vue";

const topicStore = useTopicStore();
const quizStore = useQuizStore();

const { data: _, status } = await useAsyncData("quiz", async () => {
  const response = await quizStore.getQuiz("c85181ddd3a9499d99c5b861288883f3");

  return quizStore.quiz
});

const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {

});
</script>
