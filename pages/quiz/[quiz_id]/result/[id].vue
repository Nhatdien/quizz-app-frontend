<template>
  <div
    class="flex flex-col rounded-sm justify-center items-center p-8 bg-gray-100 relative shadow-lg">
    <div class="info-pin"></div>
    <div
      class="bg-white rounded-lg shadow-md p-10 w-full max-w-lg text-center relative">
      <div class="section-pin"></div>
      <h1 class="text-2xl md:text-3xl font-semibold mb-4">Quiz Results</h1>
      <div class="text-green-500 text-5xl md:text-6xl mb-4">
        <i class="fas fa-check-circle"></i>
      </div>

      <p class="text-lg md:text-xl font-medium mb-6">Nice job, you passed!</p>

      <div class="grid grid-cols-1 gap-4 mb-6 relative">
        <div class="bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 class="text-sm md:text-base font-semibold text-gray-500">
            YOUR SCORE
          </h2>
          <p class="text-3xl md:text-4xl font-bold text-green-600">
            {{ currentScore }} / {{ quizMaxScore }}
          </p>
          <div class="relative">
            <Progress v-model="progressValue" class="w-full mt-4" />
            <span class="absolute top-[-8px] left-[40%] text-red-600">|</span>
          </div>
          <p class="text-sm md:text-base text-gray-400">PASSING SCORE: 40%</p>
        </div>
        <!-- <div class="bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 class="text-sm md:text-base font-semibold text-gray-500">
              YOUR POINTS
            </h2>
            <p class="text-3xl md:text-4xl font-bold text-green-600">10</p>
            <p class="text-sm md:text-base text-gray-400">PASSING POINTS: 10</p>
          </div> -->
      </div>
      <div class="flex justify-center w-full items-center gap-4 mt-6">
        <Button
          @click="
            () => {
              isDialogOpen = false;
              navigateTo(`/quiz/${useRoute().params.quiz_id}/join`);
            }
          ">
          Retry
        </Button>
        <MyDialog
          v-model:open="isDialogOpen"
          title="Review Quiz"
          @close="isDialogOpen = false">
          <template #trigger>
            <div class="flex justify-center">
              <Button @click="reviewQuiz" :variant="'success'">
                Review Quiz
              </Button>
            </div>
          </template>
          <template #title>
            <span class="text-2xl font-bold"
              >Show your thoughs about this quiz</span
            >
          </template>
          <ReviewCreateReviewInput
            @afterCreate="
              () => {
                isDialogOpen = false;
              }
            " />
        </MyDialog>
      </div>
      <div class="mt-12"></div>
      <MyDialog class="min-w-[500px]">
        <template #trigger>
          <p class="underline cursor-pointer">Review your submissions</p>
        </template>
        <template #title>
          <span class="text-2xl font-bold">Your submissions</span>
        </template>

        <div class="user-submissons">
          <ScrollArea class="h-104">
            <div
              class="submission mt-6 review-item"
              v-for="(question, index) in quizAttempt?.[0]?.questions">
              <div class="review-pin"></div>
              <div>
                <span class="text-2xl font-bold"
                  >{{ index + 1 }}. {{ question.questionContent }}</span
                >
                <div class="mt-4 flex flex-col gap-4">
                  <div>
                    Right Answer:
                    {{ question.correctAnswerContents?.join(" ,") }}
                  </div>
                  <div
                    class="flex gap-2 items-center"
                    :class="{
                      'text-green-600': isCorrect(
                        question.selectedAnswerContents,
                        question.correctAnswerContents
                      ),
                      'text-red-600': !isCorrect(
                        question.selectedAnswerContents,
                        question.correctAnswerContents
                      ),
                    }">
                    Your Answer:
                    {{ question.selectedAnswerContents?.join(" ,") }}
                    <component
                      :is="
                        isCorrect(
                          question.selectedAnswerContents,
                          question.correctAnswerContents
                        )
                          ? Check
                          : X
                      "
                      :class="{
                        'text-green-600': isCorrect(
                          question.selectedAnswerContents,
                          question.correctAnswerContents
                        ),
                        'text-red-600': !isCorrect(
                          question.selectedAnswerContents,
                          question.correctAnswerContents
                        ),
                      }" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </MyDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import MyDialog from "~/components/Common/MyDialog.vue";
import Progress from "~/components/ui/progress/Progress.vue";
import { Check, X } from "lucide-vue-next";
import type { Question } from "~/types/quiz";

const { $quizzAppSDK } = useNuxtApp();
const quizAttempt = computed(() => useQuizStore().quizAttempt);
const currentUser = ref($quizzAppSDK.config.current_username);

const isDialogOpen = ref();
const currentQuiz = computed(() => {
  return useQuizStore().quiz[0];
});

const isCorrect = (string1: string[], string2: string[]) => {
  return string1.join(" ,") === string2.join(" ,");
};

const currentScore = computed(() => {
  return quizAttempt.value?.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  )[0]?.score;
});

const progressValue = ref(0);

const quizMaxScore = computed(() => {
  return currentQuiz.value?.questions?.reduce(
    (acc, question) => acc + question.point,
    0
  );
});

watchEffect(() => {
  progressValue.value = (currentScore.value / quizMaxScore.value) * 100;
});

const reviewQuiz = () => {
  // Handle quiz review logic here
  console.log("Reviewing the quiz...");
};

onMounted(async () => {
  try {
    await waitForToken();
    currentUser.value = $quizzAppSDK.config.current_username;
    await useQuizStore().getQuizAttemptById(useRoute().params.id as string);

    useQuizStore().getQuiz(useRoute().params.quiz_id as string);
  } catch (error) {
    console.error("An error occurred while fetching quiz data:", error);
  }
});
</script>

<style scoped lang="scss">
.result-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  color: #333;
}

.attempt {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.highlight {
  border: 2px solid #007bff;
  background-color: #e7f3ff;
}

.recent-attempt {
  font-size: 1.2em;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}
.score {
  font-size: 1em;
  font-weight: bold;
  position: absolute;
  right: calc(50% - 4.5rem / 2);
  bottom: 5px;

  &-passed {
    color: #28a745;
  }

  &-failed {
    color: #dc3545;
  }
}

p {
  margin: 5px 0;
}
</style>
