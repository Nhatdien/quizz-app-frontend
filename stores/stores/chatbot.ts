import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type {
  BaseContent,
  MessageModel,
  SendMesRes,
  MessageFilter,
} from "@/types/chatbot";

export const useChatBotStore = defineStore({
  id: "chatbot",
  state: () => ({
    messages: [] as BaseContent[],
  }),
  actions: {
    async saveMessage(content: MessageModel): Promise<void> {
      return QuizzAppSDK.getInstance()
        .saveMessage(content)
        .then((res) => {
          this.messages.push(res.contents[0]);
        });
    },

    sendMessage(content: MessageModel): Promise<SendMesRes> {
      return QuizzAppSDK.getInstance().sendMessage(content);
    },

    async getMessages(filter: MessageFilter): Promise<void> {
      QuizzAppSDK.getInstance()
        .getMessages(filter)
        .then((res) => {
          this.messages.concat(res.content.reverse());
        });
    },
  },
});
