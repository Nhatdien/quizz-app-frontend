<template>
  <div class="quiz-card">
    <img class="quiz-image" src="@/assets/img/default_avt.jpg" :alt="quiz?.title" />
    <div class="quiz-info">
      <h3 class="quiz-title">{{ quiz?.title }}</h3>
      <div class="quiz-details">
        <span class="quiz-rating">⭐ {{ quiz?.averageRating }}/5</span>
        <span class="quiz-comments">💬 {{ quiz.totalComments ?? quiz.totalReviews }}</span>
        <span class="quiz-date ml-4">By: {{ quiz.createdBy }}</span>
      </div>
      <!-- <div class="quiz-tags">
        <span v-for="tag in tags" :key="tag" class="quiz-tag">{{ tag }}</span>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, MessageCircle, SquareCheck } from "lucide-vue-next";
import type { Quiz } from "~/types/quiz";

const props = defineProps({
  quiz: {
    type: Object as PropType<Quiz>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.quiz-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}

.quiz-card {
  display: flex;
  align-items: center;
  background-color: #fffbea;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 12px;
}

.quiz-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.quiz-info {
  flex: 1;
}

.quiz-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.quiz-details {
  font-size: 14px;
  color: #555;
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.quiz-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}

.quiz-tag {
  background-color: #f3f3f3;
  color: #333;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
}
</style>
