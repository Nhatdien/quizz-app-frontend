<template>
  <div class="flex">
    <span
      v-if="quizzes.length > 0 && loading === false"
      class="text-xl sm:text-xxl md:text-3xl"
    >
      Search result for "{{ route.query.search }}"
    </span>
    <span
      v-if="!quizzes.length && loading === false"
      class="text-center w-full text-lg sm:text-xl md:text-2xl"
    >
      Sorry, we couldn't find any results matching "{{ route.query.search }}"
    </span>
  </div>
  <div
    v-if="quizzes.length > 0"
    class="grid grid-cols-1 gap-4 mt-8">
    <QuizFilterCard
      v-for="quiz in quizzes"
      :key="quiz?.id"
      :quiz />
  </div>
</template>

<script setup lang="ts">
import type { Fullscreen } from "lucide-vue-next";
import QuizFilterCard from "~/components/Quiz/QuizFilterCard.vue";

const { $keycloak } = useNuxtApp();
const route = useRoute();
const loading = ref(true);
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {
  try {
    // if (!useQuizStore().quiz.length) {
    await waitForToken();
    const response = await useQuizStore().searchQuiz({
      textSearch: route.query.search as string,
    });
    // }
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  } finally {
    loading.value = false;
  }
});
</script>
