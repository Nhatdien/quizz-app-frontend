import { defineStore } from "pinia";
import type { Quiz, SearchParams, QuizzAttempt } from "../../types/quiz";
import QuizzAppSDK from "../quizzapp_sdk";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: [] as Quiz[],
  }),
  actions: {
    async createQuiz(quiz: Quiz) {
      return QuizzAppSDK.getInstance()
        .createQuiz(quiz)
        .then(async (quiz) => {
          
          const response = await QuizzAppSDK.getInstance().getQuiz(quiz.id);
          this.quiz.push(response);
        });
    },

    async createQuizAttempt(quizAttempt: QuizzAttempt) {
      return QuizzAppSDK.getInstance().createQuizAttempt(quizAttempt);
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
