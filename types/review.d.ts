export interface FilterReviewRes {}

export interface ReviewRequest {
  id: string;
  quizzId: string;
  comment: string;
  rating: number;
}

export interface CommentRequest {
  commentId?: string;
  reviewId: string;
  quizzId: string;
  content: string;
  parentCommentId?: string; // Optional if it can be null or undefined
}

export interface Comment {
  id: string;
  content: string;
  username: string;
  parentCommentId: any;
  reviewId: string;
  quizzId: string;
  createdAt: string;
  replies: Comment[];
}

export interface Review {
  id: string;
  quizzId: string;
  comment: string;
  username: string;
  rating: number;
  comments: Comment[];
}
export interface ReviewResponse {
  content: Review[];
}
