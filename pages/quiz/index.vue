<template>
  <div class="flex flex-1 justify-center items-center gap-4">
    <QuizCard
      v-for="quiz in quizzes"
      @click="navigateTo(`/quiz/${quiz.id}/edit`)"
      :key="quiz.id"
      :title="quiz.title"
      :description="quiz.description" />
  </div>
</template>

<script setup lang="ts">

const quizzes = computed(() => {
  return useQuizStore().quiz
})
</script>
