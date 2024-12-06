export interface BaseContent {
  parts: {
    text: string;
  }[];
  role: string;
}

export interface MessageModel {
  content: BaseContent[];
}
