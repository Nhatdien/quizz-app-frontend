import { Base } from "../base";
import type { BaseFilter } from "~/types/common";
export class Review extends Base {
  getReview(filter: BaseFilter): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/review/filter`, {
      method: "POST",
      body: JSON.stringify(filter),
    });
  }

  updateReview(reviewInfo: unknown): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/review/update`, {
      method: "POST",
      body: JSON.stringify(reviewInfo),
    });
  }

  deleteReview(reviewId: string): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/review/delete${reviewId}`, {
      method: "POST",
      body: JSON.stringify({ reviewId }),
    });
  }

  createReview(reviewInfo: unknown): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/review/create`, {
      method: "POST",
      body: JSON.stringify(reviewInfo),
    });
  }

  //COMMENT CONTROLLER

  createComment(commentInfo: unknown): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/comment/create`, {
      method: "POST",
      body: JSON.stringify(commentInfo),
    });
  }

  createReply(replyInfo: unknown): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/comment/reply`, {
      method: "POST",
      body: JSON.stringify(replyInfo),
    });
  }

  updateComment(commentInfo: unknown): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/comment/update`, {
      method: "POST",
      body: JSON.stringify(commentInfo),
    });
  }

  deleteComment(commentId: string): Promise<unknown> {
    return this.fetch(`${this.config.base_url}/comment/delete${commentId}`, {
      method: "POST",
      body: JSON.stringify({ commentId }),
    });
  }
}
