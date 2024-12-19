import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { TopicType, TopicRequest } from "../../types/topic";
import type { BaseFilter } from "~/types/common";

export const useTopicStore = defineStore({
  id: "topic",
  state: () => ({
    topics: [] as TopicType[],
    topicCodeSelected: "",
  }),
  actions: {
    async getTopics(filter: BaseFilter): Promise<void> {
      console.log(QuizzAppSDK.getInstance().config)
      return QuizzAppSDK.getInstance().getTopics(filter).then((topics) => {
        this.topics = topics.content;
      });
    },

    async filterTopics(filter: any): Promise<void> {
      return QuizzAppSDK.getInstance().filterTopics(filter).then((topics) => {
        this.topics = topics.content;
      });
    },

    async getTopic(code: string): Promise<void> {
      return QuizzAppSDK.getInstance().getTopic(code).then((topic) => {
        this.topics = [topic];
      });
    },
  },
});
