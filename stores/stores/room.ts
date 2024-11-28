import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { RoomRes } from "../../types/room";

export const useRoomStore = defineStore({
  id: "room",
  state: () => ({
    quizId: "",
    room: {} as RoomRes,
    questionIds: [] as string[],
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
  },
});
