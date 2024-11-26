import { defineStore } from "pinia";
import type {
  Quiz,
  QuizCreate,
  SearchParams,
  QuizzAttempt,
} from "../../types/quiz";
import QuizzAppSDK from "../quizzapp_sdk";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: [] as Quiz[],
  }),
  actions: {
    async createQuiz(quiz: QuizCreate) {
      return QuizzAppSDK.getInstance()
        .createQuiz(quiz)
        .then(async (quiz) => {
          const response = await QuizzAppSDK.getInstance().getQuiz(quiz.id);
          this.quiz.push(response);
        });
    },

    async updateQuiz(quiz: Quiz) {
      return QuizzAppSDK.getInstance().updateQuiz(quiz);
    },

    async createQuizAttempt(quizAttempt: QuizzAttempt) {
      return QuizzAppSDK.getInstance().createQuizAttempt(quizAttempt);
    },

    async searchQuiz(search: SearchParams) {
      return QuizzAppSDK.getInstance()
        .searchQuiz(search)
        .then((quizzes) => {
          this.quiz = [...quizzes.content];
        });
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
