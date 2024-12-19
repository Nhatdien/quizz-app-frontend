import { Base } from "../base";
import type {
  SearchParams,
  Quiz,
  QuizCreate,
  QuizFilterResposne,
  QuizzAttempt,
  Question,
} from "~/types/quiz";
import type { BaseFilter } from "~/types/common";

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

  getSuggestionQuiz(filter: BaseFilter): Promise<QuizFilterResposne> {
    return this.fetch(`${this.config.base_url}/quiz/top-suggestions`, {
      method: "POST",
      body: JSON.stringify(filter),
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

  deleteQuiz(id: string): Promise<Response> {
    return this.fetch(`${this.config.base_url}/quiz/delete/${id}`, {
      method: "DELETE",
    });
  }

  createQuizAttempt(quizAttempt: QuizzAttempt): Promise<Quiz> {
    return this.fetch(`${this.config.base_url}/quiz-attemp/create`, {
      method: "POST",
      body: JSON.stringify(quizAttempt),
    });
  }

  generateQuiz(prompt: string, topicCode: string, numberOfQuestions: number) {
    return this.fetch<Quiz>(`${this.config.base_url}/quiz/generate-quiz`, {
      method: "POST",
      body: JSON.stringify({prompt, topicCode, numberOfQuestions}),
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
  //questions

  getQuestionById(id: string): Promise<Question> {
    return this.fetch(`${this.config.base_url}/question/detail/${id}`, {
      method: "GET",
    });
  }

  deleteQuestion(id: string): Promise<Response> {
    return this.fetch(`${this.config.base_url}/question/delete/${id}`, {
      method: "DELETE",
    });
  }

}
