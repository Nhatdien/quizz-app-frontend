<template>
  <div class="container mx-auto p-4">
    <div class="review-item bg-white shadow-md rounded-lg p-6 mb-6">
      <div class="section-pin"></div>
      <div class="quiz-info mb-4">
        <h1 class="text-2xl font-bold">{{ currentQuiz?.title }}</h1>
        <p class="text-gray-700">{{ currentQuiz?.description }}</p>
        <p class="text-gray-500">Created by: {{ currentQuiz?.createdBy }}</p>
      </div>
      <div class="flex justify-end space-x-4">
        <CreateOrEditQuestionDialog
          v-if="isEditableView"
          :is-edit-button="false" />
        <Button v-else>Clone and Edit</Button>
        <Button @click="handleClickPreview" class="ml-4"><Eye/> Preview </Button>
        <Button @click="handleClickStartQuiz" class="ml-4"> <CirclePlay/> Start Quiz </Button>
      </div>
    </div>
    <div class="flex flex-col md:flex-row py-8 space-y-4 md:space-y-0 md:space-x-4">
      <QuizDetailInfo class="flex-1" />
      <div class="flex-1 flex flex-col space-y-4">
        <ReivewList />
        <CreateReviewInput />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateOrEditQuestionDialog from "~/components/Questions/CreateOrEditQuestionDialog.vue";
import { Eye, CirclePlay } from "lucide-vue-next";
import ReivewList from "~/components/Review/ReviewList.vue";
import { useReviewStore } from "~/stores/stores/review";
import CreateReviewInput from "~/components/Review/CreateReviewInput.vue";

const route = useRoute();
const { $quizzAppSDK } = useNuxtApp();
useReviewStore().currentQuizId = route.params.quiz_id as string;

const currentUserName = ref($quizzAppSDK.config.current_username);

const isEditableView = computed(() => {
  const enableEdit = currentUserName.value;

  return enableEdit;
});
const currentQuiz = computed(() => {
  return useQuizStore().quiz?.[0];
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
  const room = await $quizzAppSDK.createRoom(currentQuiz.value.id as string);
  $quizzAppSDK.webSocketClient.subscribe(
    `/topic/room/${room.id}`,
    (message) => {
      console.log(message);
    }
  );
  await useRoomStore().getQuestionIds(currentQuiz.value.id as string);
  navigateTo(
    `/room/${room.id}?quizId=${currentQuiz.value.id}&code=${room.code}`
  );
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
