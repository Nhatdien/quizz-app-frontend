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
    createTestQuiz,

    searchQuiz(search: SearchParams) {
      console.log(QuizzAppSDK.getInstance().config)
      return QuizzAppSDK.getInstance().searchQuiz(search);
    },

    getQuiz(id: string) {
      return QuizzAppSDK.getInstance().getQuiz(id).then((quiz) => {
        this.quiz = [quiz];
      });
    },
  },
});
