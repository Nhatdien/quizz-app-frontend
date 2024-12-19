<template>
  <div class="ai-quiz-container relative flex gap-8">
    <div class="input-section flex flex-col items-center flex-1">
      <div class="info-pin"></div>
      <h1 class="title text-center">A.I.</h1>
      <p class="subtitle text-center flex items-center gap-2">
        <span>Type a command to generate a quiz</span> <Bot :fill="'#FFF9CC'"/>
      </p>
      <div class="input-container">
        <Input
          v-model="currentInput.prompt"
          type="text"
          class="subject-input"
          placeholder="Enter an instruction" />
      </div>
      <div class="flex w-full justify-center gap-4 my-4">
        <MySelect
          :isFilter="true"
          :class="'dropdown'"
          :placeholder="{
            placeholderFilter: 'Filter topics',
            placeholderSelect: 'Select a topic',
          }"
          :options="topicOption"
          groupLabel="Topic"
          v-model="currentInput.topic">
        </MySelect>
        <MySelect
          :isFilter="false"
          :placeholder="{
            placeholderSelect: 'Select number of questions',
          }"
          :class="'dropdown'"
          :options="numberOfQuestionsOption"
          groupLabel="Number of questions"
          v-model="currentInput.numberOfQuestions">
        </MySelect>
      </div>
      <button @click="handleGenerateQuiz" class="generate-btn self-center">
        ⚡ Generate AI quiz
      </button>
    </div>
    <div class="view-section flex-1">
      <h3>Generated Quiz</h3>
      <ScrollArea class="w-full" style="height: 450px">
        <div v-if="!generatedQuiz.title" class="loading-container h-full">
          <img
            :class="{ 'robot-icon': true, shaking: loading }"
            src="@/assets/img/robot_PNG3.png"
            alt="Loading"
            class="loading-image" />
          <p class="text-center">
            {{
              loading
                ? "Waiting for quiz to be generated..."
                : "Hi! Please give me an instruction of the quiz you want to generate"
            }}
          </p>
        </div>
        <div class="quiz-detail-container">
          <QuizDetailInfo v-if="!loading && generatedQuiz.title" :quiz="generatedQuiz" />
        </div>
      </ScrollArea>
      <div class="flex w-full justify-center gap-4 my-4">
        <Button
          @click="handleSaveQuiz"
          class="save-btn"
          :disabled="!generatedQuiz.title"
          >💾 Save Quiz</Button
        >
        <Button @click="handleBack" class="back-btn">🔙 Back</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from "vue";
import MySelect from "~/components/Common/MySelect.vue";
import { Bot } from "lucide-vue-next";
import type { Quiz } from "~/types/quiz";

const generatedQuiz = ref({} as Quiz);
const currentInput = reactive({
  prompt: "",
  numberOfQuestions: 5,
  topic: "",
});
const loading = ref(false);

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

const handleGenerateQuiz = async () => {
  loading.value = true;
  useQuizStore().quizGenerateState.loading = true;
  await useQuizStore().generateQuiz(
    currentInput.prompt,
    currentInput.topic,
    currentInput.numberOfQuestions
  );
  loading.value = false;
};

const handleSaveQuiz = () => {
  alert("Quiz saved!");
  useQuizStore().quizGenerateState.generatedQuiz = {} as Quiz;
};

const handleBack = () => {
  // Implement back functionality
};

watch(
  () => useQuizStore().quizGenerateState.generatedQuiz,
  async (newVal) => {
    await nextTick();
    if (newVal) {
      generatedQuiz.value = newVal;
    }
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss">
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2.5px);
  }
  50% {
    transform: translateX(2.5px);
  }
  75% {
    transform: translateX(-2.5px);
  }
}

.ai-quiz-container {
  display: flex;
  flex-direction: row;
  align-items: stretch; // Ensure both sections stretch to the same height
  background-color: #0f3d42;
  padding: 50px 20px;
  border-radius: 15px;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 20px auto;
  flex-wrap: wrap;
}

.input-section,
.view-section {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background-color: #e8f6f3;
  flex: 1; // Ensure both sections take equal width
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 64px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
}

.robot-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.shaking {
  animation: shake 0.5s infinite;
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

.generate-btn,
.save-btn,
.back-btn {
  background-color: #00bfff;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 30px;
  border: none;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(64, 196, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0088cc;
    transform: scale(1.05);
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-image {
  width: 200px;
  height: 200px;
  margin: 80px auto;
}

@media (max-width: 1087px) {
  .ai-quiz-container {
    flex-direction: column;
    padding: 20px;
  }

  .input-section,
  .view-section {
    width: 100%;
  }

  .title {
    font-size: 48px;
  }

  .subject-input {
    font-size: 16px;
  }

  .generate-btn,
  .save-btn,
  .back-btn {
    font-size: 16px;
    padding: 8px 20px;
  }
}
</style>
