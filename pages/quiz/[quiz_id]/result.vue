<template>
  <div
    class="flex flex-col rounded-sm justify-center items-center p-8 bg-gray-100 relative shadow-lg">
    <div class="info-pin"></div>
    <div
      class="bg-white rounded-lg shadow-md p-10 w-full max-w-lg text-center relative">
      <div class="section-pin"></div>
      <h1 class="text-2xl md:text-3xl font-semibold mb-4">Quiz Results</h1>
      <div class="text-green-500 text-5xl md:text-6xl mb-4">
        <i class="fas fa-check-circle"></i>
      </div>

      <p class="text-lg md:text-xl font-medium mb-6">Nice job, you passed!</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative">
        <div class="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 class="text-sm md:text-base font-semibold text-gray-500">
            YOUR SCORE
          </h2>
          <p class="text-3xl md:text-4xl font-bold text-green-600">
            {{ currentScore }} / {{ quizMaxScore }}
          </p>
          <p class="text-sm md:text-base text-gray-400">PASSING SCORE: 40%</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 class="text-sm md:text-base font-semibold text-gray-500">
            YOUR POINTS
          </h2>
          <p class="text-3xl md:text-4xl font-bold text-green-600">10</p>
          <p class="text-sm md:text-base text-gray-400">PASSING POINTS: 10</p>
        </div>
      </div>

      <button
        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        @click="reviewQuiz">
        Review Quiz
      </button>
    </div>

    <div
      class="bg-white rounded-lg shadow-md p-10 w-full max-w-lg text-center relative mt-8">
      <h2 class="text-xl md:text-2xl font-semibold mb-4">Your Answers</h2>
      <!-- <div
        v-for="(question, index) in currentQuiz?.questions"
        :key="index"
        class="mb-4">
        <p class="text-lg font-medium">{{ question?.content }}</p>
        <p
          :class="{
            'text-green-600': isCorrect(question),
            'text-red-600': !isCorrect(question),
          }">
          Your answer: {{ getAnswerText(question) }}
        </p>
        <p class="text-gray-500">
          Correct answer: {{ getCorrectAnswerText(question) }}
        </p>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Progress from "~/components/ui/progress/Progress.vue";
import type { Question } from "~/types/quiz";

const { $quizzAppSDK } = useNuxtApp();
const quizAttempt = computed(() => useQuizStore().quizAttempt);
const currentUser = ref($quizzAppSDK.config.current_username);

const currentQuiz = computed(() => {
  return useQuizStore().quiz[0];
});

const currentScore = computed(() => {
  return quizAttempt.value?.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  )[0]?.score;
});

const quizMaxScore = computed(() => {
  return currentQuiz.value?.questions?.reduce(
    (acc, question) => acc + question.point,
    0
  );
});

// const isCorrect = (question: Question) => {
//   const userAnswer = quizAttempt.value?.find(attempt => attempt.questionId === question.id)?.answer;
//   return userAnswer === question.correctAnswer;
// };

// const getAnswerText = (question: Question) => {
//   const userAnswer = quizAttempt.value?.find(attempt => attempt.questionId === question.id)?.answer;
//   return question.answers.find(answer => answer.id === userAnswer)?.text || "No answer";
// };

// const getCorrectAnswerText = (question) => {
//   return question.answers.find(answer => answer.id === question.correctAnswer)?.text || "No correct answer";
// };

const reviewQuiz = () => {
  // Handle quiz review logic here
  console.log("Reviewing the quiz...");
};

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
  background-color: #f9f9f9;
}

h1 {
  color: #333;
}

.attempt {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  font-weight: bold;
  position: absolute;
  right: calc(50% - 4.5rem / 2);
  bottom: 5px;

  &-passed {
    color: #28a745;
  }

  &-failed {
    color: #dc3545;
  }
}

p {
  margin: 5px 0;
}
</style>
