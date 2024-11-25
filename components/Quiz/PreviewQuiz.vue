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
    <h2 class="quiz-title">{{ quiz?.title }}</h2>
    <transition name="fade">
      <h3
        class="quiz-question flex flex-col"
        key="question-{{ currentQuestionIndex }}">
        #{{ currentQuestionIndex + 1 }}
        <span class="" v-html="currentQuestion?.content"></span>
      </h3>
    </transition>
    <div class="min-h-[360px]">
      <div v-if="currentQuestion?.questionType === 1">
        <OptionTypeQuiz
          :question="currentQuestion"
          :currentQuestionIndex="currentQuestionIndex"
          v-model:currentSubmissions="currentSubmissions" />
      </div>
      <div
        class="h-[360px] flex align-center justify-center mx-0 my-auto"
        v-if="currentQuestion?.questionType === 2">
        <FillTheBlackType
          v-model="currentSubmissions[currentQuestionIndex]"
          :inputLength="
            getInnerTextFromHTML(currentQuestion.answers[0].content).length
          " />
      </div>
    </div>
    <div class="countdown-line"></div>
    <div class="move-buttons">
      <button
        :class="`back-button ${enableMoveButtons.back ? 'disabled' : ''}`"
        @click="() => handleClickContinue('back')"
        :disabled="enableMoveButtons.back">
        BACK
      </button>
      <button @click="handleClickSubmit" :class="`continue-button`">
        SUBMIT {{ countCorrectAnswers }}
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
    {{ currentSubmissions }}
    {{ props.quiz?.questions.length }}
    <div class="navigation-bar">
      <button @click="prevPage" :disabled="currentPage === 0">Prev</button>
      <CommonTooltipCommon v-for="(submission, index) in paginatedSubmissions">
        <template #trigger>
          <div
            :key="index"
            class="nav-item"
            :class="{
              active: index + currentPage * 5 === currentQuestionIndex,
              answered: submission?.length > 0,
            }"
            @click="currentQuestionIndex = index + currentPage * 5">
            {{ index + 1 + currentPage * 5 }}
          </div>
        </template>
        <template #content>
          <div>
            <strong>Q:</strong>
            {{ quiz?.questions[index + currentPage * 5]?.content }}
          </div>
          <div><strong>A:</strong> {{ submission.join(", ") }}</div>
        </template>
      </CommonTooltipCommon>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FillTheBlackType from "./FillTheBlankType.vue";
import OptionTypeQuiz from "./OptionType.vue";
import type { Quiz, Question, QuizzAttempt } from "~/types/quiz";

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    required: false,
  },
});

const countdownDuration = 60;
const currentQuestionIndex = ref(0);
const currentPage = ref(0);
const questionsPerPage = 5;

const currentQuestion = computed(() => {
  return props.quiz?.questions[currentQuestionIndex.value] as Question;
});

const currentSubmissions = ref<string[][]>(
  new Array(props.quiz?.questions.length).fill([])
);

const paginatedSubmissions = computed(() => {
  const start = currentPage.value * questionsPerPage;
  const end = start + questionsPerPage;
  return currentSubmissions.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil((props.quiz?.questions.length || 1) / questionsPerPage);
});

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

const countCorrectAnswers = computed(() => {
  const rightAnswers = props.quiz?.questions.map((question) => {
    return question.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => getInnerTextFromHTML(answer.content));
  }) as string[][];

  const correctAnswers = currentSubmissions.value.map((submission, index) => {
    if (props.quiz?.questions[index].questionType === 2) {
      return submission.join("") === rightAnswers[index][0];
    }

    return (
      currentSubmissions.value[index].length > 0 &&
      compareTwoArrayAnyOrder<string>(submission, rightAnswers[index])
    );
  });

  return correctAnswers.filter((answer) => answer).length;
});

const isPassedSubmission = computed(() => {
  const scoreOutOf10 =
    (countCorrectAnswers.value / (props.quiz?.questions.length || 1)) * 10;
  return scoreOutOf10 >= 4;
});

const handleClickSubmit = async () => {
  const quizAttemptPayload = {
    quizzId: props.quiz?.id,
    isPass: isPassedSubmission.value,
    score: countCorrectAnswers.value,
  };

  await useQuizStore().createQuizAttempt(quizAttemptPayload as QuizzAttempt);
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value += 1;
  }
};

watch(
  () => document,
  () => {
    if (!document || countdownDuration <= 0 || countdownDuration === Infinity) {
      return;
    }
    const countdownLine = document.querySelector(
      ".countdown-line"
    ) as HTMLElement;

    if (!countdownLine) {
      return;
    }
    countdownLine.style.width = "100%";

    let remainingTime = countdownDuration;
    const interval = setInterval(() => {
      remainingTime -= 0.1;
      const percentage = (remainingTime / countdownDuration) * 100;
      countdownLine.style.width = `${percentage}%`;

      if (remainingTime <= 0) {
        clearInterval(interval);
        countdownLine.style.width = "0%";
      }
    }, 100);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.nav-item {
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #f0f0f0;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
}

.nav-item.active {
  background-color: hsl(var(--primary)) !important;
  color: white;
}

.nav-item.answered {
  background-color: #d4edda;
}

button {
  margin: 0 5px;
}

.countdown-line {
  height: 5px;
  background-color: hsl(var(--primary));
  transition: width 0.1s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
