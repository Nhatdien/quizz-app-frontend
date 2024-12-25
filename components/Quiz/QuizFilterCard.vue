<template>
  <div class="quiz-card relative">
    <div class="review-pin"></div>
    <NuxtImg
      v-if="quiz.imageUrl"
      :src="
        quiz.imageUrl ? quiz.imageUrl : useAsset('@/assets/img/default_avt.jpg')
      "
      alt="Quiz Image"
      class="quiz-image bg-slate-100" />
    <Image class="border-2 border-slate rounded-sm p-2" v-else :size="120" />
    <div class="quiz-info">
      <h3
        @click="navigateTo(`/quiz/${quiz?.id}/view`)"
        class="quiz-title hover:cursor-pointer hover:underline">
        {{ quiz?.title }}
      </h3>
      <div class="quiz-details">
        <span class="quiz-rating">⭐ {{ quiz?.averageRating }}/5</span>
        <span class="quiz-comments"
          >💬 {{ quiz.totalComments ?? quiz.reviewCount }}</span
        >
        <span class="quiz-comments ml-2"
          ><span class="font-extrabold">?</span> {{ quiz?.questionCount }}</span
        >
        <span
          @click="() => navigateTo(`/user?search=${quiz.createdBy}`)"
          class="quiz-date ml-4 hover:underline"
          >By: {{ quiz.createdBy }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Trash, Image } from "lucide-vue-next";
import AlertDialog from "@/components/Common/AlertDialog.vue";
import type { PropType } from "vue";
import type { Quiz } from "~/types/quiz";

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    required: true,
  },

  enableDelete: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.quiz-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffbea;
  border: 1px solid #030303;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.quiz-image {
  border: 1px solid #030303;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (min-width: 1024px) {
    width: 120px;
    height: 120px;
  }
}

.quiz-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 12px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 12px;
  }
}

.quiz-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 22px;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
}

.quiz-details {
  font-size: 14px;
  color: #555;
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
  gap: 8px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
}
</style>
