<template>
  <Button @click="navigateTo('/')">Go back home</Button>
  <QuizDetailInfo/>
  <ReivewList/>
</template>

<script setup lang="ts">
import ReivewList from '~/components/Review/ReviewList.vue';
import { useReviewStore } from '~/stores/stores/review';
import type { Quiz } from '~/types/quiz';


definePageMeta({
  layout: "custom",
});

const route = useRoute();
useReviewStore().currentQuizId = route.params.quiz_id as string;

const quizStore = useQuizStore();
</script>
