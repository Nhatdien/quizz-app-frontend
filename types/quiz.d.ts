export interface Quiz {
    id?: string
    title: string
    topicCode: string
    createdBy: string
    questionCount?: number
    totalReviews?: number
    totalComments?: number
    averageRating?: number
    imageUrl?: string | null
    reviewCount?: number
    description: string
    questions: Question[]
  }

  export interface QuizCreate {
    title: string
    topicCode: string
    description: string
    imageUrl?: string | null
    questions: Question[]
  }
  
  export interface QuizFilterResposne {
    content: Quiz[]
    totalElements: number
    totalPages: number
  }
  export interface Question {
    id?: string
    content: string
    questionType: number
    imageUrl?: any
    time: number
    point: number
    answers: Answer[]
  }
  
  export interface Answer {
    id?: string
    content: string
    isCorrect: boolean
  }

  export interface SearchParams {
    pageSize?: number;
    pageNo?: number;
    from?: Date;
    to?: Date;
    textSearch?: string;
    status?: string;
  }
  
  export interface QuizzAttempt {
    id?: string
    quizzId: string
    score: number
    isPass: boolean
    time?: string
    questions: AttemptAnswer[]
  }

  export interface QuizAttemptResponse {
    attemptId: string
    quizId: string
    score: number
    isPass: boolean
    questions: AttemptAnswer[]
  }

  export interface AttemptAnswer {
    questionContent: string
    selectedAnswerContents: string[]
    correctAnswerContents: string[]
  }