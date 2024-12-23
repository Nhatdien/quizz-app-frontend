<template>
  <!-- Button display with the host-->
  <div v-if="!isPlayer">
    <div class="quiz-page">
      <HostView :room="currentRoom" />
    </div>
  </div>
  <div v-else>
    <div class="mt-5">
      <div class="quiz-page">
        <div class="text-3xl text-center my-4 flex flex-col items-center gap-8">
          <div>time left: {{ useRoomStore().clockTime }}</div>

          isCorrect:
          {{
            useQuizStore().checkCorrectAnswer(
              useRoomStore().currentSubmission[0],
              useRoomStore().currentQuestion
            )
          }}
          {{ useRoomStore().currentSubmission }}
          {{ useRoomStore().currentQuestionIndex + 1 }}/{{
            useRoomStore().questionIds.length
          }}
          <span>{{ useRoomStore().currentQuestion.content }}</span>
        </div>
        <Question
          v-if="useRoomStore().currentQuestion.questionType"
          :question="useRoomStore().currentQuestion" />
        <PlayerView
          v-if="
            isPlayer &&
            !useRoomStore().roomStarted &&
            !useRoomStore().currentQuestion.questionType
          "
          :room="currentRoom"
          :question="currentQuestion" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActivationState } from "@stomp/stompjs";
import QrCode from "~/components/Common/QrCode.vue";
import Question from "~/components/Questions/Question.vue";
import HostView from "~/components/Room/HostView.vue";
import PlayerView from "~/components/Room/PlayerView.vue";
import { toast } from "~/components/ui/toast";

definePageMeta({
  layout: "quiz",
});
const { $quizzAppSDK, $keycloak } = useNuxtApp();
const isPlayer = ref(false);

const qrValue = computed(() => {
  return (
    "localhost:4200" +
    "/room/" +
    currentRoom.value.id +
    "?code=" +
    currentRoom.value.code
  );
});

const currentRoom = computed(() => {
  return useRoomStore().room;
});

const currentQuestion = computed(() => {
  return useRoomStore().currentQuestion;
});

const route = useRoute();

const joinRoon = async () => {
  if (isPlayer.value && !useRoomStore().roomStarted) {
    $quizzAppSDK.joinRoom(
      currentRoom.value.id,
      currentRoom.value.code,
      $keycloak.getUsername() as string,
      useRoomStore().receiveQuesitonCallback
    );
  } else if (isPlayer.value && useRoomStore().roomStarted) {
    toast({
      title: "Room already started",
      description: "You can't join the room now",
      variant: "destructive",
    });
  }
};

const pollInterVal = ref();

onMounted(async () => {
  if (!$quizzAppSDK.webSocketClient.connected) {
    $quizzAppSDK.webSocketClient.activate();
  }
  $quizzAppSDK.webSocketClient.activate();
  await waitForToken();

  await useRoomStore().getRoomByCode(route.query.code as string);
  isPlayer.value =
    $quizzAppSDK.config.current_username !== currentRoom.value.createdBy;
  joinRoon();
  $quizzAppSDK.webSocketClient.subscribe(
    `/topic/room/${currentRoom.value.id}`,
    (message) => {
      console.log(message);
    }
  );
  useQuizStore().searchQuiz({
    textSearch: currentRoom.value?.quizzId,
  });
  await useRoomStore().getQuestionIds(currentRoom.value?.quizzId);
  console.log("questionIds", useRoomStore().questionIds);

  pollInterVal.value = setInterval(() => {
    if (!useRoomStore().roomStarted) {
      useRoomStore().getParticipants(currentRoom.value.code);
    }
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(pollInterVal.value);
  if (isPlayer.value) {
    useRoomStore().leaveRoom(
      currentRoom.value.id,
      currentRoom.value.code,
      $keycloak.getUsername() as string
    );
  }
});
</script>
