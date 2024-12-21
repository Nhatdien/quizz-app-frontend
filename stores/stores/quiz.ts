import { defineStore } from "pinia";
import type {
  Quiz,
  QuizCreate,
  SearchParams,
  QuizzAttempt,
  Question,
} from "@/types/quiz";
import QuizzAppSDK from "../quizzapp_sdk";
import type { BaseFilter } from "~/types/common";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quiz: [] as Quiz[],
    currentQuestionId: "",
    quizGenerateState: {
      loading: false,
      error: "",
      generatedQuiz: {} as Quiz,
    },

    quizAttempt: [] as QuizzAttempt[],
  }),
  actions: {
    async createQuiz(quiz: QuizCreate) {
      return QuizzAppSDK.getInstance()
        .createQuiz(quiz)
        .then(async (quiz) => {
          const baseFrontendURL =
            QuizzAppSDK.getInstance().config.base_frontend_url;
          console.log(baseFrontendURL);
          const response = await QuizzAppSDK.getInstance().getQuiz(
            quiz.id as string
          );
          navigateTo(`${baseFrontendURL}/quiz/${response.id}/view`, {
            external: true,
          });
        });
    },

    async updateQuiz(quiz: Quiz) {
      return QuizzAppSDK.getInstance()
        .updateQuiz(quiz)
        .then((quiz) => {
          this.getQuiz(quiz.id as string);
        });
    },

    async createQuizAttempt(quizAttempt: QuizzAttempt) {
      return QuizzAppSDK.getInstance().createQuizAttempt(quizAttempt);
    },

    async getQuizAttempt(filter: BaseFilter, isPass?: boolean) {
      return QuizzAppSDK.getInstance().getQuizAttempt(filter, isPass).then((res) => {
        this.quizAttempt = res.content;
      });
    },

    async searchQuiz(search: SearchParams) {
      return QuizzAppSDK.getInstance()
        .searchQuiz(search)
        .then(async (quizzes) => {
          this.quiz = quizzes.content;
        });
    },

    async getQuiz(id: string) {
      return QuizzAppSDK.getInstance()
        .getQuiz(id)
        .then((quiz) => {
          this.quiz = [quiz];
        });
    },

    async getSuggestionQuiz(filter: BaseFilter) {
      return QuizzAppSDK.getInstance()
        .getSuggestionQuiz(filter)
        .then((quizzes) => {
          this.quiz = quizzes.content;
        });
    },

    async generateQuiz(
      prompt: string,
      topicCode: string,
      numberOfQuestion: number
    ) {
      return QuizzAppSDK.getInstance()
        .generateQuiz(prompt, topicCode, numberOfQuestion)
        .then((quiz) => {
          this.quizGenerateState.generatedQuiz = quiz;
        });
    },

    async deleteQuiz(id: string) {
      return QuizzAppSDK.getInstance()
        .deleteQuiz(id)
        .then((res) => {
          this.quiz = this.quiz.filter((quiz) => quiz.id !== id);
        });
    },

    async deleteQuestion(id: string) {
      return QuizzAppSDK.getInstance()
        .deleteQuestion(id)
        .then(() => {
          const quiz = this.quiz.find((quiz) =>
            quiz.questions.some((question) => question.id === id)
          ) as Quiz;
          try {
            quiz.questions = quiz.questions.filter(
              (question) => question.id !== id
            );
            this.quiz = [quiz];
          } catch (error) {
            console.error("Error deleting question:", error);
          }
        });
    },

    checkCorrectAnswer(answer: string[], question: Question) {
      const rightAnswer = question.answers?.find((ans) => ans.isCorrect)
        ?.content as string;

      if (question.questionType === 2) {
        return answer?.join("") || "" === rightAnswer;
      }

      return (
        answer?.length > 0 &&
        compareTwoArrayAnyOrder<string>(answer, [rightAnswer])
      );
    },
  },
});
