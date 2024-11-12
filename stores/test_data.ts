import type { Quiz } from "../types/quiz";
import { ref } from "vue";

const generateRandomId = () => {
  return Math.random().toString(36).substring(7);
};

export let topics = [
  {
    createdAt: "2024-11-04T10:07:29.822862",
    createdBy: "tranchinhat1@gmail.com",
    updatedAt: null,
    updatedBy: null,
    id: "f90ad65fb11046d48e09ab9541e5f99d",
    title: "Programming language",
    description: "topic for programming language problems",
    code: "CODE",
  },
];

export let quizzes: Ref<Quiz[]> = ref([]);

export const createTestQuiz = async (quiz: Quiz) => {
  const newQuiz = {
    id: generateRandomId(),
    title: quiz.title,
    topicCode: quiz.topicCode,
    description: quiz.description,
    questions: [],
  };

  quizzes.value.push(newQuiz);

  console.log(quizzes.value);
  return newQuiz;
};

export const createTestQuestion = async (question: any, quizz_id: string) => {
  let quizIndex = quizzes.value.findIndex((q) => q.id === quizz_id);
  if (!quizIndex || quizIndex < 0) {
    return null;
  }
  quizzes.value[quizIndex].questions.push(question);
  return {
    id: generateRandomId(),
    title: question.title,
    question_type: question.question_type,
  };
};
