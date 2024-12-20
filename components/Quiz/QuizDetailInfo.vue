<template>
  <div class="quiz-detail-info">
    <div class="questions-section">
      <div class="comment">
        <div
          v-for="(question, index) in currentQuiz?.questions"
          :key="question.id"
          class="comment rounded-sm">
          <div class="question-header">
            <h5>{{ index + 1 }}. {{ question.content }}</h5>
            <div v-if="isEditableView" class="flex items-center gap-4">
              <CreateOrEditQuestionDialog
                :quiz="currentQuiz"
                :question="question"
                :is-edit-button="true" />
              <AlertDialog :option="deleteQuestionAlertOption(question)">
                <template #trigger>
                  <Button :variant="'destructive'">Delete</Button>
                </template>
              </AlertDialog>
            </div>
          </div>
          <ul class="answers-list">
            <li
              class="self-start"
              v-for="(answer, index) in question.answers"
              :key="answer.id">
              <div class="flex items-center gap-4">
                <Checkbox
                  v-model:checked="answer.isCorrect"
                  disabled></Checkbox>
                <p class="justify-self-start text-left">
                  {{ quizIndexMap[index] }}. {{ answer.content }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateOrEditQuestionDialog from "../Questions/CreateOrEditQuestionDialog.vue";
import AlertDialog from "../Common/AlertDialog.vue";
import type { Question, Quiz } from "~/types/quiz";
const quizIndexMap = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const { $quizzAppSDK } = useNuxtApp();
const currentUserName = ref("");

const route = useRoute();

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    required: true,
  },

  enableEdit: {
    type: Boolean,
    required: true,
  },
});

const deleteQuestionAlertOption = (question: Question) => {
  return {
    title: "Delete Question",
    description: "Are you sure you want to delete this question?",
    actionText: "Delete",
    action: async () => {
      await useQuizStore().deleteQuestion(question.id as string);
    },
  };
};

const isEditableView = computed(() => {
  return  props.enableEdit;
});

const currentQuiz = computed(() => {
  const quiz = useQuizStore().quiz[0];
  return props.quiz?.title ? props.quiz : quiz;
});

const addQuestion = () => {
  // Logic to add a question
  navigateTo("/questions/create");
};

onMounted(async () => {
  await waitForToken();
  currentUserName.value = $quizzAppSDK.config.current_username || "";
});
</script>
<style scoped>
.quiz-detail-info {
  font-size: 1rem; /* Default font size */
}

.quiz-info {
  margin-bottom: 20px;
}

.questions-section {
  margin-top: 20px;
}

.add-question-btn {
  margin-bottom: 10px;
}

.question-item {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-question-btn {
  margin-left: 10px;
}

.answers-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
}

@media (max-width: 768px) {
  .quiz-detail-info {
    font-size: 0.875rem; /* Smaller font size for small screens */
  }

  .question-header {
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.125rem !important;
  }

  .answers-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .quiz-detail-info {
    font-size: 1rem; /* Medium font size for tablets */
  }
}

@media (min-width: 1025px) {
  .quiz-detail-info {
    font-size: 1.125rem; /* Larger font size for desktops */
  }
}
</style>
