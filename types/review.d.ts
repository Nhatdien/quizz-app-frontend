export interface FilterReviewRes {}

export interface ReviewRequest {
  id: string;
  quizzId: string;
  comment: unknown;
  rating: number;
}

export interface CommentRequest {
  commentId?: string;
  reviewId: string;
  quizzId: string;
  content: string;
  parentCommentId?: string; // Optional if it can be null or undefined
}

export interface ReviewResponse {
  id: string;
  quizzId: string;
  comment: unknown;
  rating: number;
}
