<template>
  <div class="quiz-detail-info">
    <div class="quiz-info">
      <h1>{{ currentQuiz.title }}</h1>
      <p>{{ currentQuiz.description }}</p>
    </div>
    <div class="questions-section">
      <CreateOrEditQuestionDialog :is-edit-button="false" />
      <div
        v-for="question in currentQuiz.questions"
        :key="question.id"
        class="question-item">
        <div class="question-header">
          <h2>{{ question.content }}</h2>
          <CreateOrEditQuestionDialog
            :question="question"
            :is-edit-button="true" />
        </div>
        <ul class="answers-list">
          <li v-for="answer in question.answers" :key="answer.id">
            <div class="h-full flex items-center gap-4">
              <p>{{ answer.content }}</p>
              <Checkbox v-model:checked="answer.isCorrect" disabled></Checkbox>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateOrEditQuestionDialog from "../Questions/CreateOrEditQuestionDialog.vue";

const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
});

const currentQuiz = reactive({...props.quiz});

const addQuestion = () => {
  // Logic to add a question
  navigateTo("/questions/create");
};

const editQuestion = (question) => {
  // Logic to edit a question
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
  list-style-type: none;
  padding: 0;
}
</style>
