import { Base } from "../base";
import type { SearchParams, Quiz, QuizzAttempt } from "~/types/quiz";

export class Quizz extends Base {
  searchQuiz(search: SearchParams): Promise<Quiz[]> {
    return this.fetch(`${this.config.base_url}/quiz/filter`, {
      method: "POST",
      body: JSON.stringify(search),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  getQuiz(id: string): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz/${id}`, {
      method: "GET",
    });
  }

  createQuiz(quiz: Quiz): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz`, {
      method: "POST",
      body: JSON.stringify(quiz),
    });
  }

  createQuizAttempt(quizAttempt: QuizzAttempt): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz-attemp/create`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizAttempt),
    });
  }
}
