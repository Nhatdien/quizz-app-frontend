import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { RoomRes } from "../../types/room";
import type { Question } from "../../types/quiz";

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({
    quizId: "",
    room: {} as RoomRes,

    currentQuestionIndex: 0,
    currentQuestion: {} as Question,
    currentScore: 0,
    roomStarted: false,
    currentSubmission: [] as string[][],
    questionIds: [] as string[],

    participantScores: [] as { username: string; score: number }[],
  }),
  actions: {
    async createRoom(quizId: string) {
      return QuizzAppSDK.getInstance()
        .createRoom(quizId)
        .then((room) => {
          this.quizId = quizId;
          this.room = room;
        });
    },

    async getQuestionIds(quizId: string) {
      return QuizzAppSDK.getInstance()
        .getQuestionIds(quizId)
        .then((questionIds) => {
          this.quizId = quizId;
          this.questionIds = questionIds;
        });
    },

    async getRoomByCode(roomCode: string) {
      return QuizzAppSDK.getInstance()
        .getRoomByCode(roomCode)
        .then((room) => {
          this.room = room;
        });
    },

    async saveScore(username: string, score: number, roomId: string) {
      return QuizzAppSDK.getInstance().saveScore(username, score, roomId);
    },

    async getScore(roomId: string) {
      return QuizzAppSDK.getInstance()
        .getScore(roomId)
        .then((score) => {
          this.participantScores = score as any;
        });
    },

    async handleAnswerSubmission(answer: string, question: Question) {
      const isCorrect =
        question.answers.find((ans) => ans.isCorrect)?.content === answer;

      console.log(
        answer,
        question.answers.find((ans) => ans.isCorrect)?.content === answer
      );
      if (isCorrect) {
        this.currentScore += question.point;
      }
    },

    receiveQuesitonCallback(question: any) {
      console.log(JSON.parse(question.body));

      if (this.currentQuestionIndex > 0) {
        this.handleAnswerSubmission(
          this.currentSubmission[0][0],
          this.currentQuestion
        );
      }

      const curQuestion = JSON.parse(question.body);
      this.currentQuestion = curQuestion;
      this.currentSubmission = [];
      this.currentQuestionIndex += 1;

      if (this.currentQuestionIndex >= this.questionIds.length) {
        const lastQuestionTimeOut = setTimeout(() => {
          this.handleAnswerSubmission(
            this.currentSubmission[0][0],
            this.currentQuestion
          );

          console.log("last question");
          this.saveScore(
            QuizzAppSDK.getInstance().config.current_username as string,
            this.currentScore,
            this.room.id
          );
          navigateTo(`/room/${this.room.id}/result`);
          // this.currentQuestion = {} as any;
          // this.currentSubmission = [];
          // this.currentQuestionIndex = 0;
          // clearInterval(lastQuestionInterval);
        }, (this.currentQuestion.time * 1000) / 6);
      }
    },
  },
});
