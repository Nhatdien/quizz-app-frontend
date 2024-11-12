import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { TopicType } from "../../types/topic";

export const useTopicStore = defineStore({
  id: "topic",
  state: () => ({
    topics: [] as TopicType[],
  }),
  actions: {
    async getTopics(): Promise<void> {
      console.log(QuizzAppSDK.getInstance().config)
      return QuizzAppSDK.getInstance().getTopics().then((topics) => {
        this.topics = topics;
      });
    },

    async getTopic(code: string): Promise<void> {
      return QuizzAppSDK.getInstance().getTopic(code).then((topic) => {
        this.topics = [topic];
      });
    },
  },
});
