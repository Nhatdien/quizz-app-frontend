import { Base } from "../base";
import type {
  SearchParams,
  Quiz,
  QuizCreate,
  QuizFilterResposne,
  QuizzAttempt,
} from "~/types/quiz";

export class Quizz extends Base {
  searchQuiz(search: SearchParams): Promise<QuizFilterResposne> {
    return this.fetch(`${this.config.base_url}/quiz/filter`, {
      method: "POST",
      body: JSON.stringify(search),
    });
  }

  getQuiz(id: string): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz/${id}`, {
      method: "GET",
    });
  }

  createQuiz(quiz: QuizCreate): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz/create`, {
      method: "POST",
      body: JSON.stringify(quiz),
    });
  }

  updateQuiz(quiz: Quiz): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz/update`, {
      method: "POST",
      body: JSON.stringify(quiz),
    });
  }

  createQuizAttempt(quizAttempt: QuizzAttempt): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz-attemp/create`, {
      method: "POST",
      body: JSON.stringify(quizAttempt),
    });
  }

  uploadFile(file: File | null, path: string): Promise<Response> | void {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    return fetch(`${this.config.base_url}${path}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${this.config.access_token}` as string,
      },
    });
  }
  //LIVE QUIZ

}
