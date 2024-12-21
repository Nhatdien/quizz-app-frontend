<template>
  <div>
    <div class="review-pin"></div>
    <div class="review-header">
      <div>
        <h3 class="review-username">
          <img
            class="rounded-circle border border-[black] rounded-full"
            src="@/assets/img/default_avt.jpg"
            width="50"
            height="50" />
          <span class="flex flex-col">
            <span>{{ review?.username }}</span>
            <span class="text-gray text-xs">{{
              formatDate(review?.createdDate)
            }}</span>
          </span>
          <ReviewDropDown
            class="align-middle"
            :menu-options="shownReviewDropdown(review?.username)" />
        </h3>

        <span class="review-rating self-end">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="{
              filled: n <= Math.floor(review?.rating),
            }"
            >★</span
          >
        </span>
      </div>
      <div class="review-meta">
        <span class="self-start" v-if="!currentState.editReview"
          >{{ review?.comment }}
        </span>
        <span v-else>
          <Textarea
            v-model="currentState.inputContent"
            placeholder="Write a review..."
            class="w-full mt-4"
            type="textarea" />
          <div class="flex gap-4 justify-end">
            <button
              @click="
                () => {
                  currentState.editReview = false;
                  currentState.inputContent = '';
                }
              "
              class="underline">
              Cancel
            </button>
            <button @click="submitEditReview(review)" class="underline">
              Submit
            </button>
          </div>
        </span>
      </div>
    </div>
    <CreateCommentInput
      :input-info="{
        quizzId: route.params.quiz_id as string || '',
        username: $quizzAppSDK.config.current_username || '',
        reviewId: review?.id || '',
        parentCommentId: null,
      }"
      v-model:isShow="currentState.addComment"
      v-if="currentState.addComment" />
    <CommentList
      v-if="review?.comments?.length || 0 > 0"
      :comments="review?.comments" />
  </div>
</template>

<script setup lang="ts">
import CommentList from "./CommentList.vue";
import ReviewDropDown from "@/components/Common/DropDownMenu.vue";
import CreateCommentInput from "./CreateCommentInput.vue";
import { useReviewStore } from "~/stores/stores/review";
import * as types from "~/types/review";

const props = defineProps({
  review: {
    type: Object as PropType<types.Review>,
    required: true,
  },
});
const { $quizzAppSDK } = useNuxtApp();
const route = useRoute();
const { $keycloak } = useNuxtApp();
const currentState = reactive({
  addComment: false,
  editReview: false,
  inputContent: "",
  inputUserName: "",
});

const shownReviewDropdown = (createdBy: string) => {
  const isCreator =
    $keycloak.getTokenParsed()?.preferred_username === createdBy;

  const creatorDropDown = {
    label: "Actions",
    items: [
      {
        label: "Edit",
        eventHandlers: {
          click: () => {
            currentState.editReview = true;
            currentState.inputContent = props.review.comment;
          },
        },
      },
      {
        label: "Delete",
        eventHandlers: {
          click: () => {
            useTryCatch().tryCatch(() =>
              useReviewStore().deleteReview(props.review.id)
            );
          },
        },
      },

      {
        label: "Add Comment",
        eventHandlers: {
          click: () => {
            currentState.addComment = true;
            console.log("Add Comment");
          },
        },
      },
    ],
  };

  const notCreatorDropDown = {
    label: "Actions",
    items: [
      {
        label: "Add comment",
        eventHandlers: {
          click: () => {
            currentState.addComment = true;
            console.log("Add Comment");
          },
        },
      },
    ],
  };
  return isCreator ? creatorDropDown : notCreatorDropDown;
};

const submitEditReview = async (review: types.Review) => {
  useReviewStore().updateReview({
    ...review,
    comment: currentState.inputContent,
  });

  currentState.editReview = false;
  currentState.inputContent = "";

  console.log("Edit review");
};
</script>

<style scoped lang="scss">
.review-username {
  font-size: 1rem;
}

.review-meta {
  font-size: 0.875rem;
}

.review-rating {
  font-size: 1.25rem;
}

@media (min-width: 640px) {
  .review-username {
    font-size: 1.125rem;
  }

  .review-meta {
    font-size: 1rem;
  }

  .review-rating {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .review-username {
    font-size: 1.25rem;
  }

  .review-meta {
    font-size: 1.125rem;
  }

  .review-rating {
    font-size: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .review-username {
    font-size: 1.5rem;
  }

  .review-meta {
    font-size: 1.25rem;
  }

  .review-rating {
    font-size: 2rem;
  }
}
</style>
