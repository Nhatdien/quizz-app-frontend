<template>
  <div class="quiz-container paper bg-yellow-600 stacked">
    <div class="progress-container">
      <div class="progress-bar-time">
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
        {{ `${currentQuestionIndex + 1}/${quiz?.questions?.length}` }}
      </div>
    </div>
    <h2 class="quiz-title text-3xl">{{ quiz?.title }}</h2>

    <h3
      class="quiz-question w-full flex flex-col justify-center items-center"
      key="question-{{ currentQuestionIndex }}">
      <div class="flex flex-col text-2xl">
        #{{ currentQuestionIndex + 1 }}
        <span>{{ currentQuestion?.content }}</span>
      </div>
      <NuxtImg
        v-if="currentQuestion?.imageUrl !== null"
        class="h-full max-h-60 w-40 md:w-60 object-cover"
        :src="currentQuestion?.imageUrl"
        :size="120">
      </NuxtImg>
    </h3>
    <div class="min-h-[360px]" :key="currentQuestionIndex">
      <div v-if="currentQuestion?.questionType === 1">
        <OptionTypeQuiz
          :question="currentQuestion"
          :currentQuestionIndex="currentQuestionIndex"
          v-model:currentSubmissions="currentSubmissions" />
      </div>
      <div
        class="h-[360px] flex items-center justify-center mx-0 my-auto"
        v-if="currentQuestion?.questionType === 2">
        <FillTheBlackType
          :key="currentQuestionIndex"
          v-model="currentSubmissions[currentQuestionIndex]" />
      </div>
    </div>
    <div class="move-buttons">
      <button
        :class="`back-button ${enableMoveButtons.back ? 'disabled' : ''}`"
        @click="() => handleClickContinue('back')"
        :disabled="enableMoveButtons.back">
        <ArrowLeft />
      </button>
      <Button
        @click="handleClickSubmit"
        class="p-4 text-2xl"
        :disabled="!allSubmissionFilled">
        SUBMIT
      </Button>
      <button
        :class="`continue-button ${
          enableMoveButtons.continue ? 'disabled' : ''
        }`"
        @click="() => handleClickContinue('continue')"
        :disabled="enableMoveButtons.continue">
        <ArrowRight />
      </button>
    </div>
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
import { ArrowLeft, ArrowRight } from "lucide-vue-next";
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
const currentScore = ref(0);

const currentQuestion = computed(() => {
  return props.quiz?.questions?.[currentQuestionIndex.value] as Question;
});

const currentSubmissions = ref<string[][]>(
  new Array(props.quiz?.questions?.length).fill([])
);

watch(
  () => props.quiz?.questions.length,
  () => {
    currentSubmissions.value = new Array(props.quiz?.questions?.length).fill(
      []
    );
  }
);

const paginatedSubmissions = computed(() => {
  const start = currentPage.value * questionsPerPage;
  const end = start + questionsPerPage;
  return currentSubmissions.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil((props.quiz?.questions?.length || 1) / questionsPerPage);
});

const enableMoveButtons = computed(() => {
  return {
    continue:
      currentQuestionIndex.value === (props.quiz?.questions?.length || 1) - 1,
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

const rightAnswersArr = computed(() => {
  return props.quiz?.questions.map((question) => {
    return question.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => answer.content);
  }) as string[][];
});

const allSubmissionFilled = computed(() => {
  return currentSubmissions.value.every((submission) => submission.length > 0);
});

const getScore = computed(() => {
  const rightAnswers = rightAnswersArr.value;

  const correctAnswers = currentSubmissions.value.map((submission, index) => {
    if (props.quiz?.questions[index].questionType === 2) {
      return submission === rightAnswers[index][0];
    }

    return (
      currentSubmissions.value[index].length > 0 &&
      compareTwoArrayAnyOrder<string>(submission, rightAnswers[index])
    );
  });

  return correctAnswers.reduce((total, isCorrect, index) => {
    if (isCorrect) {
      return total + (props.quiz?.questions[index].point || 0);
    }
    return total;
  }, 0);
});

const isPassedSubmission = computed(() => {
  const scoreOutOf10 =
    (getScore.value / (props.quiz?.questions?.length || 1)) * 10;
  return scoreOutOf10 >= 4;
});

const handleClickSubmit = async () => {
  const quizAttemptPayload = {
    quizzId: props.quiz?.id as string,
    isPass: isPassedSubmission.value,
    score: getScore.value,
    questions: [] as QuizzAttempt["questions"],
  };

  const rightAnswerAndSubmission = rightAnswersArr.value.map(
    (rightAnswer, index) => {
      return {
        questionContent: props.quiz?.questions[index].content as string,
        correctAnswerContents: rightAnswer as string[],
        selectedAnswerContents:
          props.quiz?.questions[index].questionType === 2
            ? [currentSubmissions.value[index]]
            : currentSubmissions.value[index],
      };
    }
  );

  quizAttemptPayload.questions = rightAnswerAndSubmission;

  const attempt = await useQuizStore().createQuizAttempt(quizAttemptPayload);
  navigateTo("result/" + attempt.id);
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

watchEffect(() => {
  useQuizStore().currentQuestionId = props.quiz?.questions?.[
    currentQuestionIndex.value
  ].id as string;
});
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
</style>
