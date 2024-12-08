import { Base } from "../base";
import type { BaseContent, MessageModel, SendMesRes } from "@/types/chatbot";

export class ChatBot extends Base {
  saveMessage(content: MessageModel): Promise<MessageModel> {
    return this.fetch(`${this.config.base_url}/chat/save-message`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  sendMessage(content: BaseContent): Promise<SendMesRes> {
    return this.fetch(`${this.config.base_url}/chat/send-message`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  getMessages(username: string): Promise<MessageModel> {
    return this.fetch(
      `${this.config.base_url}/chat/get-message?username=${username}`,
      {
        method: "GET",
      }
    );
  }
}
