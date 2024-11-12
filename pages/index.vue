<template>
  <div>
    <h1 class="text-xl bold">Recently taken quizzes:</h1>

    <QuizCard
      v-for="quiz in quizzes"
      @click="navigateTo(`/quiz/${quiz.id}/edit`)"
      :key="quiz.id"
      :title="quiz.title"
      :description="quiz.description"
    />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import CreateQuestion from "~/components/Questions/CreateOrEditQuestion.vue";

const topicStore = useTopicStore();
const quizStore = useQuizStore();

const { data: _, status } = await useAsyncData("quiz", async () => {
  const response = await quizStore.getQuiz("272c3b64a06d40de8776f1e28ef44171");
});

const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {

});
</script>
