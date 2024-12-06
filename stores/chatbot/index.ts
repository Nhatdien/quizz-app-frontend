import { Base } from "../base";
import type { BaseContent, MessageModel } from "@/types/chatbot";

export class ChatBot extends Base {
  saveMessage(content: MessageModel): Promise<string> {
    return this.fetch(`${this.config.base_url}/chatbot/save-message`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  sendMessage(content: BaseContent): Promise<string> {
    return this.fetch(`${this.config.base_url}/chatbot/send-message`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  getMessages(username: string): Promise<BaseContent[]> {
    return this.fetch(
      `${this.config.base_url}/chatbot/get-messages?username=${username}`,
      {
        method: "GET",
      }
    );
  }
}
