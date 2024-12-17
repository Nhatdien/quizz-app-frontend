<template>
  <div class="review-item">
    <div class="pin"></div>
    <div class="review-header">
      <div>
        <h3 class="review-username">
          <img
            class="rounded-circle border border-[black] rounded-full"
            src="@/assets/img/default_avt.jpg"
            width="40"
            height="40" />
          <span>{{ $keycloak.getTokenParsed()?.preferred_username }}</span>
        </h3>
      </div>
      <div class="review-meta">
        <CommonRatingInput
          class="self-start"
          v-model="currentReviewInput.rating" />
        <Textarea
          v-model="currentReviewInput.comment"
          placeholder="Write your own review..."
          class="w-full mt-4"
          type="textarea" />
        <div class="self-end gap-4">
          <Button @click="submitCreateReview" class="underline text-base mt-4"
            >Create Review</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReviewStore } from "~/stores/stores/review";
import * as types from "~/types/review";

const { $quizzAppSDK, $keycloak } = useNuxtApp();
const route = useRoute();

const currentUsername = computed<string>(
  () => {
    return $keycloak?.getTokenParsed()?.preferred_username;
  }
);

const currentReviewInput = reactive({
  comment: "",
  username: currentUsername,
  quizzId: route.params.quiz_id as string,
  rating: 0,
});

const submitCreateReview = async () => {
  if (!currentReviewInput.comment) {
    return;
  }

  await useReviewStore().createReview(currentReviewInput);
  // console.log($keycloak.getTokenParsed()?.preferred_username);
  // console.log(currentReviewInput);
  currentReviewInput.comment = "";
  currentReviewInput.rating = 0;
};
</script>

<style scoped lang="scss"></style>
