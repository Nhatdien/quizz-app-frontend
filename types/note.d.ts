export interface NoteRequest {
  id?: string;
  note?: string;
  title?: string;
  questionId?: string;
  quizzId?: string;
  username?: string;
}


export interface NoteResponse {
  id: string; 
  title: string;
  note: string;
  questionId: string;
  quizzId: string;
  createdBy: string;
}