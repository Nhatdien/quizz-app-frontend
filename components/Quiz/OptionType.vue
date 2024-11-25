<template>
  <div class="options">
    <div
      v-for="(answer, index) in question?.answers"
      @click="(event) => handleClickOption(event, index, question)"
      :class="`option ${checkActiveOption(index, question)}`"
      :key="index">
      <span class="option-label">{{ questionIndexMap[index] }}</span>
      <div class="option-content">
        <div class="option-text" v-html="answer.content"></div>
        <!-- <div class="option-price">
            ₹ 17,356, <span class="price-change negative">-0.31%</span>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Quiz, Question } from "~/types/quiz";

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },

  currentQuestionIndex: {
    type: Number as PropType<number>,
    required: true,
  },
  currentSubmissions: {
    type: Array as PropType<string[][]>,
    required: true,
  },
});

const questionIndexMap = ["A", "B", "C", "D", "E"];

const checkQuestionHaveMultipleAnswers = (question: Question) => {
  return question.answers.filter((answer) => answer.isCorrect).length > 1;
};

const checkActiveOption = (index: number, question: Question) => {
  return props.currentSubmissions?.[props.currentQuestionIndex]?.includes(
    question.answers[index].content
  )
    ? "active"
    : "";
};

const handleClickOption = async (
  event: MouseEvent,
  optionIndex: number,
  question: Question
) => {
  await nextTick();
  let currentAnswer = [...props.currentSubmissions[props.currentQuestionIndex] || []];

  if (checkQuestionHaveMultipleAnswers(question)) {
    if (currentAnswer.includes(question.answers[optionIndex].content)) {
      const answerIndex = currentAnswer.indexOf(
        question.answers[optionIndex].content
      );
      currentAnswer.splice(answerIndex, 1);
    } else {
      currentAnswer.push(question.answers[optionIndex].content);
    }
  } else {
    currentAnswer = [question.answers[optionIndex].content];
  }

  props.currentSubmissions[props.currentQuestionIndex] = currentAnswer;
};
</script>
