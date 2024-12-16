<template>
  <Button @click="navigateTo('/')">Go back home</Button>
  <QuizDetailInfo />
  <ReivewList />
  <CreateReviewInput />
</template>

<script setup lang="ts">
import ReivewList from "~/components/Review/ReviewList.vue";
import { useReviewStore } from "~/stores/stores/review";
import CreateReviewInput from "~/components/Review/CreateReviewInput.vue";

definePageMeta({
  layout: "custom",
});

const route = useRoute();
useReviewStore().currentQuizId = route.params.quiz_id as string;

const quizStore = useQuizStore();

onMounted(async () => {
  await waitForToken();
  quizStore.getQuiz(route.params.quiz_id as string);
  useReviewStore().getReview({
    textSearch: route.params.quiz_id as string,
  });
});
</script>
