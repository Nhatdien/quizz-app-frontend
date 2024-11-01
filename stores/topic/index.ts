import { Base } from "../base";
import type { TopicType } from "../types/topic";

export class Topic extends Base {
  async getTopics(): Promise<TopicType[]> {
    return this.fetch<TopicType[]>(`${this.config.base_url}/topics`);
  }

  async getTopic(code: string): Promise<TopicType> {
    return this.fetch<TopicType>(`${this.config.base_url}/topics/${code}`);
  }

  async createTopic(topic: TopicType): Promise<TopicType> {
    return this.fetch<TopicType>(`${this.config.base_url}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });
  }
}
