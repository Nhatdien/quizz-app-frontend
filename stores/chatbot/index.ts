import { Base } from "../base";
import type {
  BaseContent,
  MessageModel,
  SendMesRes,
  MessageFilter,
  MessageFilterResponse
} from "@/types/chatbot";

export class ChatBot extends Base {
  saveMessage(content: MessageModel): Promise<MessageModel> {
    return this.fetch(`${this.config.base_url}/chat/save-message`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  sendMessage(content: MessageModel): Promise<SendMesRes> {
    return this.fetch(`${this.config.base_url}/chat/send-message`, {
      method: "POST",
      body: JSON.stringify(content),
    });
  }

  getMessages(filter: MessageFilter): Promise<MessageFilterResponse> {
    return this.fetch(`${this.config.base_url}/chat/get-message`, {
      method: "POST",
      body: JSON.stringify(filter),
    });
  }
}
