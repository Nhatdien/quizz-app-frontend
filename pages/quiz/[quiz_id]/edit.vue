<template>
  <Button @click="navigateTo('/')">Go back home</Button>
  <QuizDetailInfo/>
  <ReviewReivewList/>
</template>

<script setup lang="ts">
import type { Quiz } from '~/types/quiz';


definePageMeta({
  layout: "custom",
});

const route = useRoute();

const quizStore = useQuizStore();
</script>
