<template>
  <div class="ai-quiz-container">
    <h1 class="title">A.I.</h1>
    <p class="subtitle">Type a subject to generate a quiz</p>
    <div class="input-container">
      <Input type="text" class="subject-input" placeholder="Enter a subject" />
    </div>
    <div class="options">
      <MySelect
        :isFilter="true"
        :class="'dropdown'"
        :options="topicOption"
        groupLabel="Number of questions">
      </MySelect>
      <MySelect
        :isFilter="false"
        :class="'dropdown'"
        :options="numberOfQuestionsOption"
        groupLabel="Number of questions">
      </MySelect>
    </div>
    <button @click="handleGenerateQuiz" class="generate-btn">
      ⚡ Generate AI quiz
    </button>
  </div>
</template>

<script setup lang="ts">
import MySelect from "~/components/Common/MySelect.vue";

const currentInput = reactive({
  prompt: "",
  numberOfQuestions: 5,
  topic: "",
});
const numberOfQuestionsOption = [
  { value: 5, label: "5 questions" },
  { value: 8, label: "8 questions" },
  { value: 10, label: "10 questions" },
];

const topicOption = computed(() => {
  return useTopicStore().topics.map((topic) => ({
    value: topic.code,
    label: topic.title,
  }));
});

const handleGenerateQuiz = () => {};
</script>

<style scoped>
.ai-quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 50px 20px;
  border-radius: 15px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

.title {
  font-size: 64px;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  font-size: 20px;
  margin: 10px 0 20px;
}

.input-container {
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
}

.subject-input {
  width: 100%;
  padding: 15px;
  height: 3rem;
  font-size: 18px;
  border-radius: 30px;
  outline: none;
  box-shadow: 0 30px 30px rgba(255, 255, 255, 0.3);
}

.options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.dropdown {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
}

.generate-btn {
  background-color: #40c4ff;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 30px;
  border: none;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(64, 196, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.generate-btn:hover {
  background-color: #00b0ff;
  transform: scale(1.05);
}
</style>
