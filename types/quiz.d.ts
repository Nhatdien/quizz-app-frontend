export interface Quiz {
    id: string
    title: string
    topicCode: string
    description: string
    questions: Question[]
  }
  
  export interface Question {
    id: string
    content: string
    questionType: number
    imageUrl: any
    answers: Answer[]
  }
  
  export interface Answer {
    id: string
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
    id: string
    quizzId: string
    score: number
    isPass: boolean
  }