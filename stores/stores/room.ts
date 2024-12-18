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
      return QuizzAppSDK.getInstance().getScore(roomId).then((score) => {
        this.participantScores = score as any;
      }
      );
    },
  },
});
