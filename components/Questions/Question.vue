<template>
  <div class="flex flex-col min-w-[375px] w-full">
    <transition name="fade" mode="out-in">
      <div class="comment text-[#121212]" :key="question.id">
        <QuizOptionType
          v-if="question.questionType === 1"
          :question="question"
          :current-question-index="0"
          :current-submissions="useRoomStore().currentSubmission" />
        <div
          class="py-16 px-8 flex align-center justify-center"
          v-if="question?.questionType === 2">
          <!-- {{ useRoomStore().currentSubmission[0] }}
          {{ useRoomStore().currentQuestion?.answers?.[0]?.content }} -->

          <!-- {{
            useRoomStore().checkIsCorrect(
              useRoomStore().currentSubmission,
              useRoomStore().currentQuestion
            )
          }} -->
          <FillTheBlankType
            :class="'text-[#121212]'"
            v-model="useRoomStore().currentSubmission[0]" />
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
