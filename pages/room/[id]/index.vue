<template>
  <div>
    <h1>Live quiz Room</h1>
    <p>Room code: {{ currentRoom.code }}</p>
    {{ useRoomStore().currentScore }}
    <!-- Button display with the host-->
    <Button @click="handleNextQuestion"> Start </Button>
    {{ useRoomStore().currentQuestionIndex }} {{ useRoomStore().questionIds.length }}
    <div class="mt-5">
      {{ useRoomStore().currentQuestion.content }}
      <QuizOptionType
        v-if="currentQuestion?.questionType === 1"
        :question="currentQuestion"
        :current-question-index="0"
        :current-submissions="useRoomStore().currentSubmission" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActivationState } from "@stomp/stompjs";

const { $quizzAppSDK } = useNuxtApp();

const timer = ref(0);
let timerInterval: ReturnType<typeof setInterval>;

const startTimer = () => {
  timer.value = 0;
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const currentRoom = computed(() => {
  return useRoomStore().room;
});

const currentQuestion = computed(() => {
  return useRoomStore().currentQuestion;
});

const route = useRoute();

const handleNextQuestion = async () => {
  $quizzAppSDK.nextQuestion(
    useRoomStore().questionIds[useRoomStore().currentQuestionIndex],
    currentRoom.value.id
  );

  useRoomStore().currentQuestionIndex++;

  const nextQuestionInterval = setInterval(
    async () => {
      const questionId =
        useRoomStore().questionIds[useRoomStore().currentQuestionIndex];

      $quizzAppSDK.nextQuestion(questionId, currentRoom.value.id);
      if (
        useRoomStore().currentQuestionIndex >= useRoomStore().questionIds.length
      ) {
        console.log("End of quiz");
        clearInterval(nextQuestionInterval);
        return;
      }
      useRoomStore().currentQuestionIndex++;
    },

    // (
    //   await $quizzAppSDK.getQuestionById(
    //     useRoomStore().questionIds[useRoomStore().currentQuestionIndex]
    //   )
    // ).time * 1000

    useRoomStore().questionIds.length ? 5000 : 0
  );
};

onMounted(async () => {
  if (!$quizzAppSDK.webSocketClient.connected) {
    $quizzAppSDK.webSocketClient.activate();
  }
  $quizzAppSDK.webSocketClient.activate();
  const room = await useRoomStore().getRoomByCode(route.query.code as string);
  useRoomStore().quizId = route.query.quizId as string;
  await $quizzAppSDK.getQuestionIds(useRoomStore().quizId);
});

onUnmounted(() => {
  $quizzAppSDK.webSocketClient.unsubscribe(
    `/topic/room/${currentRoom.value.id}`
  );
});
</script>
