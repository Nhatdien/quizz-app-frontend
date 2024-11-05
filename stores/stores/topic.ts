import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { TopicType } from "../types/topic";

export const useTopicStore = defineStore({
  id: "topic",
  state: () => ({
    topics: [] as TopicType[],
  }),
  actions: {
    async fetchTopics(): Promise<void> {
      console.log(QuizzAppSDK.getInstance().config)
      return QuizzAppSDK.getInstance().getTopics().then((topics) => {
        this.topics = topics;
      });
    },
  },
});
