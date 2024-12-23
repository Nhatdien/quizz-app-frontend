<template>
  <div class="flex flex-col min-w-[375px] w-full">
    <transition name="slide-left" mode="out-in">
      <div class="comment text-[#121212]" :key="question.id">
        <QuizOptionType
          v-if="question.questionType === 1"
          :question="question"
          :current-question-index="0"
          :current-submissions="useRoomStore().currentSubmission" />
        <div
          class="h-[360px] flex align-center justify-center mx-0 my-auto"
          v-if="question?.questionType === 2">
          <FillTheBlankType
            :class="'text-[#121212]'"
            v-model="useRoomStore().currentSubmission[0]"
            :inputLength="
              question.answers.find((answer) => answer.isCorrect)?.content?.length ||
              0
            " />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "~/types/quiz";
import FillTheBlankType from "../Quiz/FillTheBlankType.vue";

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});
</script>

<style scoped>
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.5s ease;
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(100%);
}
</style>
