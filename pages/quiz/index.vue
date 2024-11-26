<template>
  {{ quizzes }}
  <div
    v-if="quizzes.length > 0"
    class="flex flex-1 justify-center items-center gap-4">
    <QuizCard
      v-for="quiz in quizzes"
      @click="navigateTo(`/quiz/${quiz?.id}/edit`)"
      :key="quiz?.id"
      :title="quiz?.title"
      :description="quiz?.description" />
  </div>
</template>

<script setup lang="ts">
const { $keycloak } = useNuxtApp();


const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {
  const response = await useQuizStore().searchQuiz({
    textSearch: $keycloak.getTokenParsed()?.preferred_username,
  });
});
</script>
