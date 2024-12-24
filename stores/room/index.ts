import type { Question } from "~/types/quiz";
import { Base } from "../base";
import type { RoomRes, Participant } from "@/types/room";

export class Room extends Base {
  async createRoom(quizId: string) {
    return this.fetch<RoomRes>(
      `${this.config.base_url}/room/create?quizId=${quizId}`,
      {
        method: "POST",
      }
    );
  }

  getRoomByCode(roomCode: string) {
    return this.fetch<RoomRes>(
      `${this.config.base_url}/room/get-by-code/${roomCode}`,
      {
        method: "GET",
      }
    );
  }

  getParticipants(roomCode: string) {
    return this.fetch<Participant>(
      `${this.config.base_url}/room/participants?roomCode=${roomCode}`,
      {
        method: "GET",
      }
    );
  }

  subscribeUserScoreTopic(
    roomId: string,
    onMessageCallback: (message: any) => void
  ) {
    super.webSocketClient.subscribe(
      `/topic/room/${roomId}/user-score`,
      onMessageCallback
    );
  }

  unsubscribeUserScoreTopic(roomId: string) {
    super.webSocketClient.unsubscribe(`/topic/room/${roomId}/user-score`);
  }

  sendUserScoreTopic(roomId: string, username: string, score: number) {
    super.webSocketClient.publish({
      destination: `/app/room/${roomId}/update-score`,
      body: JSON.stringify({ username, score }),
    });
  }

  joinRoom(
    roomId: string,
    roomCode: string,
    username: string,
    onMessageCallback: (message: any) => void
  ) {
    super.webSocketClient.subscribe(
      `/topic/room/${roomId}/questions`,
      onMessageCallback
    );
    return this.fetch(
      `${this.config.base_url}/participant/join?roomCode=${roomCode}&username=${username}`,
      {
        method: "POST",
      }
    );
  }

  saveScore(username: string, score: number, roomId: string) {
    return this.fetch(`${this.config.base_url}/participant/save-score`, {
      method: "POST",
      body: JSON.stringify({ username, score, roomId }),
    });
  }

  getScore(roomId: string) {
    return this.fetch(`${this.config.base_url}/participant/get-score`, {
      method: "POST",
      body: JSON.stringify({ roomId }),
    });
  }

  leaveRoom(roomId: string, roomCode: string, username: string) {
    super.webSocketClient.unsubscribe(`/topic/room/${roomId}/questions`);
    return this.fetch(
      `${this.config.base_url}/participant/leave?roomCode=${roomCode}&username=${username}`,
      {
        method: "POST",
      }
    );
  }

  getQuestionIds(quizId: string): Promise<string[]> {
    return this.fetch(
      `${this.config.base_url}/quiz/question-ids?id=${quizId}`,
      {
        method: "GET",
      }
    );
  }

  nextQuestion(questionId: string, roomId: string): void {
    this.webSocketClient.publish({
      destination: `/app/room/${roomId}/next-question`,
      body: questionId,
    });
  }

  getDetailQuestion(questionId: string): Promise<Question> {
    return this.fetch(`${this.config.base_url}/question/detail/${questionId}`, {
      method: "GET",
    });
  }
}
