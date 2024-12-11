<template>
  <div class="comment">
    <div class="flex gap-4">
      <img
        class="rounded-circle border border-[black] rounded-full"
        src="@/assets/img/default_avt.jpg"
        width="40"
        height="40" />
      <h3>{{ comment.username }}</h3>
      <CommentDropDown :menu-options="shownReviewDropdown(comment.username)" />
    </div>
    <p v-if="!currentState.editComment">{{ comment.content }}</p>
    <p v-else>
      <Textarea
        v-model="currentState.inputContent"
        placeholder="Write a comment..."
        class="w-full mt-4"
        type="textarea" />
        <div class="flex gap-4 justify-end">
      <button
        @click="
          () => {
            currentState.editComment = false;
            currentState.inputContent = '';
          }
        "
        class="underline">
        Cancel
      </button>
      <button @click="submitEditComment(comment)" class="underline">
        Submit
      </button>
    </div>
    </p>


    <ReviewCreateCommentInput
      :input-info="inputInfo"
      v-model:isShow="currentState.addComment"
      v-if="currentState.addComment" />
    <Comment v-for="reply in comment.replies" :comment="reply" />
  </div>
</template>

<script setup lang="ts">
import CommentDropDown from "@/components/Common/DropDownMenu.vue";
import { useReviewStore } from "~/stores/stores/review";
import * as types from "@/types/review";

const props = defineProps({
  comment: {
    type: Object as PropType<any>,
    required: true,
  },
});
const { $keycloak, $quizzAppSDK } = useNuxtApp();
const currentState = reactive({
  addComment: false,
  editComment: false,
  inputContent: "",
  inputUserName: "",
});

const inputInfo = {
  quizId: props.comment?.quizId || "",
  parentCommentId: props.comment?.parentCommentId || "",
  username: $quizzAppSDK.config.current_username || "",
};

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
            currentState.editComment = true;
            currentState.inputContent = props.comment.content;
          },
        },
      },
      {
        label: "Delete",
        eventHandlers: {
          click: () => {
            useReviewStore().deleteComment(props.comment.id);
          },
        },
      },

      {
        label: "Reply",
        eventHandlers: {
          click: () => {
            currentState.addComment = true;
          },
        },
      },
    ],
  };

  const notCreatorDropDown = {
    label: "Actions",
    items: [
      {
        label: "Reply",
        eventHandlers: {
          click: () => {
            currentState.addComment = true;
          },
        },
      },
    ],
  };
  return isCreator ? creatorDropDown : notCreatorDropDown;
};

const submitEditComment = async (comment: types.Comment) => {
  useReviewStore().updateComment({
    ...comment,
    commentId: comment.id,
    content: currentState.inputContent,
  });

  currentState.editComment = false;
  currentState.inputContent = "";

  console.log("Edit comment");
};
</script>

<style scoped lang="scss"></style>
