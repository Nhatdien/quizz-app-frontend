import { defineStore } from "pinia";
import { quizzes, createTestQuestion, createTestQuiz } from "../test_data";
import type { Quiz, SearchParams } from "../../types/quiz";
import QuizzAppSDK from "../quizzapp_sdk";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: [] as Quiz[],
  }),
  actions: {
    createTestQuestion,
    async createQuiz(quiz: Quiz) {
      return QuizzAppSDK.getInstance()
        .createQuiz(quiz)
        .then(async (quiz) => {
          
          const response = await QuizzAppSDK.getInstance().getQuiz(quiz.id);
        });
    },

    searchQuiz(search: SearchParams) {
      return QuizzAppSDK.getInstance().searchQuiz(search);
    },

    async getQuiz(id: string) {
      return QuizzAppSDK.getInstance()
        .getQuiz(id)
        .then((quiz) => {
          this.quiz = [quiz];
        });
    },
  },
});
