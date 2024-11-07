import { defineStore } from "pinia";
import { quizzes, createTestQuestion, createTestQuiz } from "../test_data";
import type { Quiz } from "../types/quiz";
import QuizzAppSDK from "../quizzapp_sdk";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: quizzes.value as Quiz[],
  }),
  actions: {
    createTestQuestion,
    createTestQuiz,
  },
});
