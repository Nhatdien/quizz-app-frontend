<template>
  <Card class="quiz-card">
    <CardHeader>
      <CardTitle>{{ quiz?.title }}</CardTitle>
      <CardDescription>{{ quiz?.description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="aspect-auto max-w-28">
        <img
          src="@/assets/img/default_avt.jpg"
          alt="Quiz Image"
          class="quiz-image" />
      </div>
      <div class="flex flex-col">
        <div class="flex-1">
          <!-- <p class="text-sm text-gray-500">Questions</p>
          <p class="text-lg">{{ quiz?.questions.length }}</p> -->
          Created by:
          <span @click="navigateTo(`/quiz/?search=${quiz?.createdBy}`)">
            {{ quiz?.createdBy }}
          </span>
        </div>
        <div class="flex justify-start gap-8">
          <span class="flex gap-2"
            >{{ quiz?.averageRating?.toFixed(1) }}/5 <Star :fill="'yellow'"
          /></span>
          <div class="flex self-end gap-2">
            <MessageCircle :fill="'f1f1f1'" class="ml-auto" />
            {{ quiz?.reviewCount ?? quiz?.totalComments }}
          </div>
          <div class="flex self-end gap-2">
            <SquareCheck class="ml-auto" />
            {{ quiz?.questionCount ?? quiz?.totalComments }}
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Star, MessageCircle, SquareCheck } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Quiz } from "@/types/quiz";

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
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  cursor: pointer;
  padding: 1rem;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}

.quiz-image {
  object-fit: cover;
  height: auto;
  margin-bottom: 1rem;
}
</style>
