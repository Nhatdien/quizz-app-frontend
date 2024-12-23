<template>
  <Card class="quiz-card relative">
    <div class="review-pin"></div>
    <CardHeader>
      <CardTitle :class="enableDelete ? 'flex justify-between' : ''">
        <span
          @click="navigateTo(`/quiz/${quiz.id}/view`)"
          class="hover:underline cursor-pointer"
          >{{ quiz?.title }}</span
        >
        <AlertDialog
          v-if="enableDelete"
          v-model:open="isOpen"
          class=""
          :option="deleteQuizAlertOption">
          <template #trigger>
            <Button variant="destructive"><Trash /></Button>
          </template>
        </AlertDialog>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="image-container mt-4">
        <NuxtImg
          v-if="quiz.imageUrl"
          :size="120"
          :src="
            quiz.imageUrl
              ? quiz.imageUrl
              : useAsset('@/assets/img/default_avt.jpg')
          "
          alt="Quiz Image"
          class="quiz-image" />
        <Image
          class="border-2 border-slate rounded-sm p-2"
          v-else
          :size="120" />
      </div>
      <div class="quiz-details">
        <!-- <div class="creator-info">
          <span>Created by:</span>
          <span
            class="creator-name"
            @click="navigateTo(`/quiz/?search=${quiz?.createdBy}`)">
            {{ quiz?.createdBy }}
          </span>
        </div> -->
        <div class="stats-container">
          <div class="stat">
            <span class="stat-value">
              {{ quiz?.averageRating?.toFixed(1) || "0.0" }}/5
            </span>
            <Star :fill="'yellow'" class="stat-icon" />
          </div>
          <div class="stat">
            <MessageCircle :fill="'f1f1f1'" class="stat-icon" />
            <span class="stat-value">
              {{ quiz?.reviewCount || quiz?.totalComments || 0 }}
            </span>
          </div>
          <div class="stat">
            <SquareCheck class="stat-icon" />
            <span class="stat-value">
              {{ quiz?.questionCount || 0 }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>

    <CardFooter> </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Star,
  MessageCircle,
  SquareCheck,
  Image,
  Trash,
} from "lucide-vue-next";
import AlertDialog from "@/components/Common/AlertDialog.vue";

import {
  Card,
  CardContent,
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

  enableDelete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const isOpen = ref(false);

const deleteQuizAlertOption = {
  title: "Delete Quiz",
  description: "Are you sure you want to delete this quiz?",
  actionText: "Delete",
  action: async () => {
    isOpen.value = false;
    return useQuizStore().deleteQuiz(props.quiz.id as string);
  },
};
</script>

<style scoped lang="scss">
.quiz-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}

.image-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  object-fit: cover;
}

.creator-info {
  font-size: 0.9rem;
  display: flex;
  gap: 0.5rem;

  .creator-name {
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #007acc;
    }
  }
}

.stats-container {
  display: flex;
  gap: 1rem;

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .stat-icon {
      width: 20px;
      height: 20px;
    }

    .stat-value {
      font-size: 0.9rem;
      font-weight: bold;
    }
  }
}
</style>
