import { Base } from "../base";
import type { SearchParams, Quiz } from "~/types/quiz";

export class Quizz extends Base {

  searchQuiz (search: SearchParams): Promise<Quiz[]> {
    return this.fetch(`${this.config.base_url}/quiz/filter`, {
        method: "GET",
        body: JSON.stringify(search),
    });
  }

  getQuiz (id: string): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz/${id}`, {
        method: "GET",
    });
  }
}
