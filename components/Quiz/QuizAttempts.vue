<template>
  <div class="result-page relative shadow-md">
    <div class="info-pin"></div>
    <h3 class="mt-8">Your results:</h3>
    <div class="relative" v-if="quizAttempt && quizAttempt?.length">
      <div class="section-pin"></div>
      <div class="attempt highlight">
        <p class="recent-attempt">Last Attempt:</p>

        <progress
          class="progress-bar"
          :aria-label="`Score: ${quizAttempt[0].score}`"
          :max="quizMaxScore"
          :value="quizAttempt[0].score" />
        <span
          :class="{
            score: true,
            'score-passed': quizAttempt[0].score >= quizMaxScore * 0.4,
            'score-failed': quizAttempt[0].score < quizMaxScore * 0.4,
          }"
          >Score: {{ quizAttempt[0].score }}</span
        >
      </div>
      <h5 class="mt-4">Other attempts:</h5>
      <ScrollArea type="always" class="h-24">
        <div
          v-for="(attempt, index) in quizAttempt.slice(1)"
          :key="index"
          class="attempt">
          <div class="flex justify-between items-center">
            <p>{{ formatDate(attempt.time) }}</p>
            <span>Score: {{ attempt.score }}/{{ quizMaxScore }}</span>
          </div>
          <progress
            class="progress-bar"
            v-bind:max="quizMaxScore"
            :value="attempt.score" />
        </div>
      </ScrollArea>
    </div>
    <div v-else>
      <p>No attempts found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Progress from "~/components/ui/progress/Progress.vue";

const { $quizzAppSDK } = useNuxtApp();
const quizAttempt = computed(() => useQuizStore().quizAttempt);
const currentUser = ref($quizzAppSDK.config.current_username);

const currentQuiz = computed(() => {
  return useQuizStore().quiz[0];
});

const quizMaxScore = computed(() => {
  return currentQuiz.value?.questions?.reduce(
    (acc, question) => acc + question.point,
    0
  );
});
const scoreInProgress = computed(() => {
  return;
});

onMounted(async () => {
  try {
    await waitForToken();
    currentUser.value = $quizzAppSDK.config.current_username;
    await useQuizStore().getQuizAttempt({
      textSearch: $quizzAppSDK.config.current_username,
    });

    useQuizStore().getQuiz(useRoute().params.quiz_id as string);
  } catch (error) {
    console.error("An error occurred while fetching quiz data:", error);
  }
});
</script>

<style scoped lang="scss">
.result-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  background-color: #9fe7f52a;
}

h1 {
  color: #333;
}

.attempt {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
}

.highlight {
  border: 2px solid #007bff;
  background-color: #e7f3ff;
}

.recent-attempt {
  font-size: 1.2em;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}
.score {
  font-size: 1em;
  font-weight: 900;
  position: absolute;
  right: calc(50% - 4.5rem / 2);
  bottom: 14px;

  &-passed {
    color: #41cd62;
  }

  &-failed {
    color: #e55462;
  }
}

p {
  margin: 5px 0;
}
</style>
