<template>
  <div class="review-list">
    <div
      class="review-item"
      v-for="review in reviews?.content"
      :key="review?.id">
      <div class="pin"></div>
      <div class="review-header">
        <div>
          <h3 class="review-username">
            <img
              class="rounded-circle border border-[black] rounded-full"
              src="@/assets/img/default_avt.jpg"
              width="40"
              height="40" />
            <span>{{ review?.username }}</span>
            <ReviewDropDown
              class="align-middle"
              :menu-options="shownReviewDropdown(review.createdBy)" />
          </h3>
        </div>
        <div class="review-meta">
          <span>{{ review?.comment }} </span>
          <span class="review-rating">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= review?.rating }"
              >★</span
            >
          </span>
        </div>
      </div>
      <CommentList :comments="review?.comments" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentList from "./CommentList.vue";
import ReviewDropDown from "../Common/DropDownMenu.vue";

const { $keycloak } = useNuxtApp();
const reviews = ref();
const { $quizzAppSDK } = useNuxtApp();
const route = useRoute();
onMounted(async () => {
  reviews.value = await $quizzAppSDK.getReview({
    textSearch: route.params.quiz_id as string,
  });
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
            console.log("Edit");
          },
        },
      },
      {
        label: "Delete",
        eventHandlers: {
          click: () => {
            console.log("Delete");
          },
        },
      },

      {
        label: "Reply",
        eventHandlers: {
          click: () => {
            console.log("Reply");
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
            console.log("Reply");
          },
        },
      },
    ],
  };
  return isCreator ? creatorDropDown : notCreatorDropDown;
};
</script>

<style scoped lang="scss">
.review-list {
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.review-item {
  position: relative;
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transform: rotate(-1deg);

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateX(-50%);
  }
}

.pin {
  position: absolute;
  top: -15px;
  left: 50%;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
}

.review-header {
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-bottom: 10px;

  h3 {
    margin: 0 0 10px;
    font-size: 1.2em;
    color: #333;
  }
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-username {
  display: flex;
  gap: 10px;
  font-size: 1em;
  color: #666;
}

.review-rating {
  font-size: 1em;
  color: #f5c518;

  .star {
    font-size: 1.2em;
    color: #ddd;

    &.filled {
      color: #f5c518;
    }
  }
}
</style>
