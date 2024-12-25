<template>
  <!-- Button display with the host-->
  <div v-if="!isPlayer">
    <div class="quiz-page">
      <HostView :room="currentRoom" />
    </div>
  </div>
  <div v-else>
    <div class="mt-5">
      <div class="quiz-page w-full">
        <div
          v-if="useRoomStore().currentQuestion.questionType"
          class="text-3xl w-full h-full text-center my-4 flex flex-col items-center gap-4">
          {{ useRoomStore().currentQuestionIndex }}/{{
            useRoomStore().questionIds.length
          }}
          <RoomScoreLeaderBoard
            v-if="useRoomStore().showingLeaderboard"
            :scores="useRoomStore().participantScores" />

          <RoomCountDownScreen
            class="justify-self-center "
            v-if="useRoomStore().showingCountDown"
            :time="useRoomStore().countDownBeforeStart" />
          <div
            class="w-full my-4 flex flex-col items-center gap-4"
            v-if="
              useRoomStore().currentQuestion.questionType &&
              !useRoomStore().showingLeaderboard &&
              !useRoomStore().showingCountDown
            ">
            <progress
              class="progress-bar"
              v-bind:max="useRoomStore().questionIds.length"
              :value="useRoomStore().currentQuestionIndex" />
            <Clock
              :duration="useRoomStore().currentQuestion.time"
              :remaining-time="useRoomStore().clockTime"
              :countdown-style="countdownStyle" />
            <span>{{ useRoomStore().currentQuestion.content }}</span>
          </div>
          <Question
            class="h-full"
            v-if="
              !useRoomStore().showingLeaderboard &&
              !useRoomStore().showingCountDown
            "
            :question="useRoomStore().currentQuestion" />
        </div>
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
import Clock from "~/components/Common/Clock.vue";
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

const countdownStyle = {
  height: "60px",
  width: "60px",
  margin: "0 auto",
  marginTop: "20px",
  textAlign: "center",
  position: "relative",
};

const currentRoom = computed(() => {
  return useRoomStore().room;
});

const currentQuestion = computed(() => {
  return useRoomStore().currentQuestion;
});

const route = useRoute();

const joinRoon = async () => {
  //join the room and subscribe to the question topic
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

  //subscribe to the score topic
  $quizzAppSDK.subscribeUserScoreTopic(
    currentRoom.value.id,
    useRoomStore().receiveScoreMessageCallback
  );
};

const pollInterVal = ref();

watch(
  () => useRoomStore().roomParticipants,
  () => {
    useRoomStore().roomParticipants.forEach((participant) => {
      if (!(participant.username in useRoomStore().participantScores)) {
        useRoomStore().participantScores[participant.username] = 0;
      }
    });
  }
);
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
  useQuizStore().getQuiz(currentRoom.value?.quizzId);
  await useRoomStore().getQuestionIds(currentRoom.value?.quizzId);
  console.log("questionIds", useRoomStore().questionIds);

  pollInterVal.value = setInterval(() => {
    if (!useRoomStore().roomStarted) {
      useRoomStore().getParticipants(currentRoom.value.code);
    }
  }, 3000);
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
  useRoomStore().reset();
});
</script>
