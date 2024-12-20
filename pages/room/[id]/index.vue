<template>
  <!-- Button display with the host-->
  <div v-if="!isPlayer">
    <div class="quiz-page">
      <HostView :room="currentRoom" />
    </div>
  </div>
  <div v-else>
    <div class="mt-5">
      {{ useRoomStore().currentQuestion.content }}

      <div class="quiz-page">
        <PlayerView
          v-if="false"
          :room="currentRoom"
          :question="currentQuestion" />
        <QuizOptionType
          :question="testQuestion"
          :current-question-index="0"
          :current-submissions="useRoomStore().currentSubmission" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ActivationState } from "@stomp/stompjs";
import QrCode from "~/components/Common/QrCode.vue";
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

const testQuestion = {
  id: "19c9550713a94e82acd249b9a29958ac",
  content: "Ký hiệu nào dùng để gán giá trị trong JavaScript?",
  point: 10.0,
  time: 30,
  questionType: 1,
  imageUrl: null,
  answers: [
    {
      id: "53e0475c7819419787b56a51512c5425",
      content: "=>",
      isCorrect: false,
    },
    {
      id: "6fcf582f503f47a9a5d7a0c728e0d263",
      content: "==",
      isCorrect: false,
    },
    {
      id: "b6b70b513b514826b9abda9f6d4d1b87",
      content: ":=",
      isCorrect: false,
    },
    {
      id: "fdd0081879684896bc33b147b6ff4137",
      content: "=",
      isCorrect: true,
    },
  ],
}

const route = useRoute();

const joinRoon = async () => {
  if (isPlayer.value && !useRoomStore().roomStarted) {
    $quizzAppSDK.joinRoom(
      currentRoom.value.id,
      currentRoom.value.code,
      $keycloak.getUsername() as string,
      useRoomStore().receiveQuesitonCallback
    );
  } else {
    toast({
      title: "Room already started",
      description: "You can't join the room now",
      variant: "destructive",
    });
  }
};

onMounted(async () => {
  if (!$quizzAppSDK.webSocketClient.connected) {
    $quizzAppSDK.webSocketClient.activate();
  }
  $quizzAppSDK.webSocketClient.activate();
  await waitForToken();
  isPlayer.value = $keycloak.getUsername() !== currentRoom.value.createdBy;

  await useRoomStore().getRoomByCode(route.query.code as string);
  useQuizStore().searchQuiz({
    textSearch: currentRoom.value?.quizzId,
  });
  await $quizzAppSDK.getQuestionIds(currentRoom.value?.quizzId);
});

onUnmounted(() => {
  $quizzAppSDK.webSocketClient.unsubscribe(
    `/topic/room/${currentRoom.value.id}`
  );

  isPlayer.value = false;
});
</script>
