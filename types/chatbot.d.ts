export interface BaseContent {
  parts: {
    text: string;
  }[];
  role: string;
}

export interface MessageModel {
  content: BaseContent[];
}


export interface SendMesRes{
  candidates: MessageModel[];
  modelVersion: string;
}