import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { BaseContent, MessageModel, SendMesRes } from "@/types/chatbot";

export const useChatBotStore = defineStore({
  id: "chatbot",
  state: () => ({
    messages: {} as MessageModel,
  }),
  actions: {
    saveMessage(content: MessageModel): Promise<MessageModel> {
      return QuizzAppSDK.getInstance().saveMessage(content);
    },

    sendMessage(content: BaseContent): Promise<SendMesRes> {
      return QuizzAppSDK.getInstance().sendMessage(content);
    },

    async getMessages(username: string): Promise<void> {
      QuizzAppSDK.getInstance().getMessages(username).then(res => {
        this.messages = res
      })
    },
  },
});
