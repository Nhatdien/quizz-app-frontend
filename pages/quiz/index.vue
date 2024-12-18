<template>
  Search result for "{{ route.query.search }}""
  <div
    v-loading="loading"
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
import type { Fullscreen } from "lucide-vue-next";

const { $keycloak } = useNuxtApp();
const route = useRoute();
const loading = ref(true);
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {
  if (!useQuizStore().quiz.length) {
    await waitForToken();
    const response = await useQuizStore().searchQuiz({
      textSearch: route.query.search as string,
    });
  }
});
</script>
