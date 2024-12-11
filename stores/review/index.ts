import { Base } from "../base";
import type { BaseFilter } from "~/types/common";
import * as types from "~/types/review";
export class Review extends Base {
  getReview(filter: BaseFilter): Promise<types.ReviewResponse> {
    return this.fetch(`${this.config.base_url}/review/filter`, {
      method: "POST",
      body: JSON.stringify(filter),
    });
  }

  updateReview(reviewInfo: unknown): Promise<types.Review> {
    return this.fetch(`${this.config.base_url}/review/update`, {
      method: "POST",
      body: JSON.stringify(reviewInfo),
    });
  }

  deleteReview(reviewId: string): Promise<void> {
    return this.fetch(`${this.config.base_url}/review/${reviewId}`, {
      method: "DELETE",
    });
  }

  createReview(reviewInfo: types.ReviewRequest): Promise<types.Review> {
    return this.fetch(`${this.config.base_url}/review/create`, {
      method: "POST",
      body: JSON.stringify(reviewInfo),
    });
  }

  //COMMENT CONTROLLER

  createComment(commentInfo: types.CommentRequest): Promise<types.Comment> {
    return this.fetch(`${this.config.base_url}/comment/create`, {
      method: "POST",
      body: JSON.stringify(commentInfo),
    });
  }

  createReply(replyInfo: types.CommentRequest): Promise<types.Comment> {
    return this.fetch(`${this.config.base_url}/comment/reply`, {
      method: "POST",
      body: JSON.stringify(replyInfo),
    });
  }

  updateComment(commentInfo: types.CommentRequest): Promise<types.Comment> {
    return this.fetch(`${this.config.base_url}/comment/update`, {
      method: "POST",
      body: JSON.stringify(commentInfo),
    });
  }

  deleteComment(commentId: string): Promise<void> {
    return this.fetch(`${this.config.base_url}/comment/${commentId}`, {
      method: "DELETE",
    });
  }
}
