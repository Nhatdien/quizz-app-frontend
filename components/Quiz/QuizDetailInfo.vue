<template>
  <div class="quiz-detail-info">
    <div class="quiz-info">
      <h1>{{ currentQuiz.title }}</h1>
      <p>{{ currentQuiz.description }}</p>
    </div>
    <div class="questions-section">
      <CreateOrEditQuestionDialog :is-edit-button="false" />
      <Button @click="handleClickPreview" class="ml-4"> Preview </Button>
      <Button @click="handleClickStartQuiz" class="ml-4"> Start Quiz </Button>
      <div
        v-for="(question, index) in currentQuiz.questions"
        :key="question.id"
        class="question-item">
        <div class="question-header">
          <h2>{{ index + 1 }}. {{ question.content }}</h2>
          <CreateOrEditQuestionDialog
            :quiz="currentQuiz"
            :question="question"
            :is-edit-button="true" />
        </div>
        <ul class="answers-list">
          <li
            class="self-start"
            v-for="(answer, index) in question.answers"
            :key="answer.id">
            <div class="flex items-center gap-4">
              <Checkbox v-model:checked="answer.isCorrect" disabled></Checkbox>
              <p class="justify-self-start text-left">
                {{ quizIndexMap[index] }}. {{ answer.content }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateOrEditQuestionDialog from "../Questions/CreateOrEditQuestionDialog.vue";

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

const route = useRoute();

const { data } = useAsyncData(async () => {
  const response = await useQuizStore().getQuiz(route.params.quiz_id as string);
  return useQuizStore().quiz;
});

const handleClickPreview = () => {
  // Logic to preview the quiz
  navigateTo(`/quiz/${route.params.quiz_id}/join?preview=true`);
};

const currentQuiz = computed(() => {
  return useQuizStore().quiz[0];
});

const addQuestion = () => {
  // Logic to add a question
  navigateTo("/questions/create");
};

const handleClickStartQuiz = () => {
  $quizzAppSDK.createRoom(currentQuiz.value.id);
};
</script>

<style scoped>
.quiz-detail-info {
  padding: 20px;
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
  list-style-type: none;
  padding: 0;
}
</style>
