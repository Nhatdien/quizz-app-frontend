<template>
  <div class="quiz-container">
    <div class="progress-container">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{
            width: `${
              ((currentQuestionIndex + 1) / (quiz?.questions?.length || 1)) *
              100
            }%`,
          }"></div>
      </div>
      <div class="progress-text">
        {{ `${currentQuestionIndex + 1}/${quiz?.questions.length}` }}
      </div>
    </div>
    <!-- <div class="points"><span class="points-icon">🔵</span> 200</div> -->
    <h2 class="quiz-title">{{ quiz?.title }}</h2>
    <h3 class="quiz-question">
      #{{ currentQuestionIndex + 1 }} {{ currentQuestion?.content }}
    </h3>
    <div v-if="currentQuestion.questionType === 1">
      <OptionTypeQuiz
        :question="currentQuestion"
        :currentQuestionIndex="currentQuestionIndex"
        v-model:currentSubmissions="currentSubmissions" />
    </div>
    <div class="flex justify-center" v-if="currentQuestion.questionType === 2">
      <FillTheBlackType 
      v-model="currentSubmissions[currentQuestionIndex]"
      :inputLength="getInnerTextFromHTML(currentQuestion.answers[0].content).length"/>
    </div>
    <!-- Countdown line container -->
    <div class="countdown-line"></div>
    <div class="move-buttons">
      <button
        :class="`back-button ${enableMoveButtons.back ? 'disabled' : ''}`"
        @click="() => handleClickContinue('back')"
        :disabled="enableMoveButtons.back">
        BACK
      </button>
      <button
        :class="`continue-button ${
          enableMoveButtons.continue ? 'disabled' : ''
        }`"
        @click="() => handleClickContinue('continue')"
        :disabled="enableMoveButtons.continue">
        CONTINUE
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FillTheBlackType from "./FillTheBlackType.vue";
import OptionTypeQuiz from "./OptionType.vue";
import type { Quiz, Question } from "~/types/quiz";

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    required: false,
  },
});
// Set the countdown duration in seconds
const countdownDuration = 3600; // Example: 10 seconds
const currentQuestionIndex = ref(0);

const currentQuestion = computed(() => {
  return props.quiz?.questions[currentQuestionIndex.value] as Question;
});

const currentSubmissions = ref<string[][]>(
  new Array(props.quiz?.questions.length).fill([])
);

const enableMoveButtons = computed(() => {
  return {
    continue:
      currentQuestionIndex.value === (props.quiz?.questions.length || 1) - 1,
    back: currentQuestionIndex.value === 0,
  };
});

const handleClickContinue = (backOrContinue: "back" | "continue") => {
  if (backOrContinue === "back") {
    currentQuestionIndex.value -= 1;
  }
  if (backOrContinue === "continue") {
    currentQuestionIndex.value += 1;
  }
};

const questionIndexMap = ["A", "B", "C", "D", "E"];

watch(
  () => document,
  () => {
    if (!document || countdownDuration <= 0 || countdownDuration === Infinity) {
      return;
    }
    const countdownLine = document.querySelector(
      ".countdown-line"
    ) as HTMLElement;
    // Initialize the width of the countdown line to 100%
    countdownLine.style.width = "100%";

    // Set up the countdown interval
    let remainingTime = countdownDuration;
    const interval = setInterval(() => {
      remainingTime -= 0.1; // Decrease time in smaller steps for smooth animation
      const percentage = (remainingTime / countdownDuration) * 100;
      countdownLine.style.width = `${percentage}%`;

      // Stop the countdown when it reaches zero
      if (remainingTime <= 0) {
        clearInterval(interval);
        countdownLine.style.width = "0%";
      }
    }, 100); // Update every 100ms for smooth animation
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
