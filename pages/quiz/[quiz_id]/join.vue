<template>
  <PreviewQuiz :quiz="currentQuiz" />
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";

definePageMeta({
  layout: "custom",
});

const route = useRoute();


const { data, error } = useAsyncData("preview-quiz", async () => {
  const response = await useQuizStore().getQuiz(route.params.quiz_id as string);
  
  return response;
});

const currentQuiz = computed(() => {
  return useQuizStore().quiz.find((quiz) => quiz.id === route.params.quiz_id);
});

</script>
