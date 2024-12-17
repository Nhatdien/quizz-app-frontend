export type TopicRequest = {
  code: string;
  title: string;
  description: string;
};

export interface TopicType {
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  id: string;
  title: string;
  description: string;
  code: string;
}
export type TopicFilterResponse = {
  content: TopicRequest[];
  totalElements: number;
};
