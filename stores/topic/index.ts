import { Base } from "../base";
import type { TopicType, TopicRequest, TopicFilterResponse } from "../../types/topic";
import type { BaseFilter, FilterResponse } from "~/types/common";

export class Topic extends Base {
  async getTopics() {
    return this.fetch<TopicType[]>(`${this.config.base_url}/topic`);
  }

  async getTopic(code: string) {
    return this.fetch<TopicType>(`${this.config.base_url}/topic/${code}`);
  }

  filterTopics(filter: BaseFilter) {
    return this.fetch<FilterResponse<TopicType>>(`${this.config.base_url}/topic/filter`, {
      method: "POST",
      body: JSON.stringify(filter),
    });
  }

  async createTopic(topic: TopicRequest) {
    return this.fetch<TopicRequest>(`${this.config.base_url}/topic`, {
      method: "POST",
      body: JSON.stringify(topic),
    });
  }
}
