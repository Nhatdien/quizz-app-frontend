<template>
  <div class="container mx-auto p-4">
    <div class="review-item bg-white shadow-md rounded-lg p-6">
      <div class="section-pin"></div>
      <div class="quiz-info flex items-center gap-4 md:gap-8 mb-4">
        <div class="image-container">
          <NuxtImg
            v-if="currentQuiz?.imageUrl"
            :size="120"
            :src="
              currentQuiz?.imageUrl
                ? currentQuiz.imageUrl
                : '@/assets/img/default_avt.jpg'
            "
            alt="Quiz Image"
            class="quiz-image" />
          <Image class="border-2 border-slate rounded-sm p-2" v-else :size="120"/>
        </div>
        <div class="">
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
            {{ currentQuiz?.title }}
          </h1>
          <p class="text-gray-700 text-base md:text-lg lg:text-xl">
            {{ currentQuiz?.description }}
          </p>
          <p class="text-gray-500 text-sm md:text-base lg:text-lg">
            Created by:
            <span
              @click="
                () => {
                  navigateTo(`/user?search=${currentQuiz?.createdBy}`);
                }
              "
              class="hover:underline cursor-pointer"
              >{{ currentQuiz?.createdBy }}</span
            >
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-start gap-4 justify-between md:items-center">
        <Badge :variant="'secondary'">
          <span
            class="hover:underline cursor-pointer"
            @click="
              () => {
                navigateTo(`/quiz/?search=${currentQuiz?.topicCode}`);
              }
            "
            >{{ currentQuiz?.topicCode }}</span
          >
        </Badge>
        <div class="flex flex-col md:flex-row gap-4">
          <CreateOrEditQuestionDialog
            v-if="isEditableView"
            :is-edit-button="false" />
          <Button :variant="'warning'" @click="handleClickCloneAndEdit" v-else
            >Clone and Edit</Button
          >
          <Button @click="handleClickPreview" class=""
            ><Eye /> Preview
          </Button>
          <Button :variant="'info'" @click="handleClickStartQuiz">
            <CirclePlay /> Start Quiz
          </Button>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col lg:flex-row py-8 space-y-4 md:space-y-0 md:space-x-0 lg:space-x-4 lg:space-y-4">
      <QuizDetailInfo :enable-edit="isEditableView" class="flex-1" />
      <div class="flex-1 flex flex-col sm:space-y-0 md:space-y-0">
        <ReivewList />
        <CreateReviewInput />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateOrEditQuestionDialog from "~/components/Questions/CreateOrEditQuestionDialog.vue";
import { Eye, CirclePlay, Image } from "lucide-vue-next";
import ReivewList from "~/components/Review/ReviewList.vue";
import { useReviewStore } from "~/stores/stores/review";
import CreateReviewInput from "~/components/Review/CreateReviewInput.vue";
import type { Quiz } from "~/types/quiz";

const route = useRoute();
const { $quizzAppSDK } = useNuxtApp();
useReviewStore().currentQuizId = route.params.quiz_id as string;

const currentUserName = ref($quizzAppSDK.config.current_username);

const isEditableView = computed(() => {
  const enableEdit = currentUserName.value === currentQuiz.value?.createdBy;

  return enableEdit;
});
const currentQuiz = computed(() => {
  return useQuizStore().quiz?.find((quiz) => quiz.id === route.params.quiz_id);
});

const handleClickPreview = () => {
  // Logic to preview the quiz
  navigateTo(`/quiz/${route.params.quiz_id}/join?preview=true`);
};

const handleClickStartQuiz = async () => {
  if (!$quizzAppSDK.webSocketClient.connected) {
    console.log($quizzAppSDK.webSocketClient);
    $quizzAppSDK.webSocketClient.activate();
  }
  const room = await $quizzAppSDK.createRoom(currentQuiz.value?.id as string);
  $quizzAppSDK.webSocketClient.subscribe(
    `/topic/room/${room.id}`,
    (message) => {
      console.log(message);
    }
  );
  await useRoomStore().getQuestionIds(currentQuiz.value?.id as string);
  navigateTo(
    `/room/${room.id}?quizId=${currentQuiz.value?.id}&code=${room.code}`
  );
};

const handleClickCloneAndEdit = async () => {
  const quiz = { ...currentQuiz.value };

  delete quiz.id;
  delete quiz.createdBy;

  quiz.questions = quiz.questions?.map((question) => {
    delete question.id;
    question.answers = question.answers?.map((answer) => {
      delete answer.id;
      return answer;
    });
    return question;
  });

  await useQuizStore().createQuiz(quiz as Quiz);
};

const quizStore = useQuizStore();

onMounted(async () => {
  await waitForToken();

  currentUserName.value = $quizzAppSDK.config.current_username;
  quizStore.getQuiz(route.params.quiz_id as string);
  useReviewStore().getReview({
    textSearch: route.params.quiz_id as string,
  });
});
</script>
