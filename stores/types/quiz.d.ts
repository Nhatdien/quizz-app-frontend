export interface Quiz {
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
  