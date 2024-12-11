import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";
import type { BaseFilter } from "~/types/common";
import * as types from "~/types/review";

export const useReviewStore = defineStore({
  id: "review",
  state: () => ({
    reviews: [] as types.Review[],
    currentQuizId: useRoute().params.quiz_id as string,
  }),
  actions: {
    async getReview(filter: BaseFilter): Promise<void> {
      return QuizzAppSDK.getInstance()
        .getReview(filter)
        .then((reviews) => {
          this.reviews = reviews.content;
        });
    },

    async updateReview(reviewInfo: types.Review): Promise<void> {
      return QuizzAppSDK.getInstance()
        .updateReview(reviewInfo)
        .then(() => {
          this.reviews = this.reviews.map((review) => {
            if (review.id === reviewInfo.id) {
              return reviewInfo;
            }
            return review;
          });
        });
    },

    async deleteReview(reviewId: string): Promise<void> {
      return QuizzAppSDK.getInstance()
        .deleteReview(reviewId)
        .then(() => {
          this.reviews = this.reviews.filter((review) => {
            if (review.id === reviewId) {
              return false;
            }
            return true;
          });
        });
    },

    async createReview(reviewInfo: types.ReviewRequest): Promise<void> {
      return QuizzAppSDK.getInstance()
        .createReview(reviewInfo)
        .then(async (comment) => {
          this.getReview({
            textSearch: comment.quizzId,
          });
        });
    },

    //COMMENT CONTROLLER

    async createComment(commentInfo: types.CommentRequest): Promise<void> {
      QuizzAppSDK.getInstance()
        .createComment(commentInfo)
        .then((comment) => {
          this.getReview({
            textSearch: comment.quizzId,
          });
        });
    },

    async createReply(replyInfo: types.CommentRequest): Promise<void> {
      return QuizzAppSDK.getInstance()
        .createReply(replyInfo)
        .then((comment) => {
          this.getReview({
            textSearch: comment.quizzId,
          });
        });
    },

    async updateComment(commentInfo: types.CommentRequest): Promise<void> {
      return QuizzAppSDK.getInstance()
        .updateComment(commentInfo)
        .then((comment) => {
          this.getReview({
            textSearch: comment.quizzId,
          });
        });
    },

    async deleteComment(commentId: string): Promise<void> {
      QuizzAppSDK.getInstance()
        .deleteComment(commentId)
        .then(() => {
          this.getReview({
            textSearch: this.currentQuizId,
          });
        });
    },
  },
});
