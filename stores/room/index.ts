import { Base } from "../base";
import type { RoomRes } from "@/types/room";

export class Room extends Base {
  async createRoom(quizId: string) {
    return this.fetch<RoomRes>(`${this.config.base_url}/room/create?quizId=${quizId}`, {
      method: "POST",
    });
  }

  joinRoom(roomId: string) {
    return super.webSocketClient.subscribe(
      `${this.config.websocket_url}/topic/room/${roomId}/questions`,
      (message) => {
        console.log(message);
      }
    );
  }

  leaveRoom(roomId: string) {
    super.webSocketClient.unsubscribe(
      `${this.config.websocket_url}/topic/room/${roomId}/questions`
    );
  }

  nextQuestion(roomId: string) {
    super.webSocketClient.publish({
      destination: `${this.config.websocket_url}/app/room/${roomId}/next-question`,
      body: JSON.stringify({
        roomId,
      }),
    });
  }
}
