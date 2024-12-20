<template>
  <div class="success-pin"></div>
  <div class="header">
    <div class="join-info flex flex-col items-center">
      <h2>Join at:</h2>
      <CommonLogo />
    </div>
    <div class="pin-info">
      <h2>PIN code:</h2>
      <div class="pin my-2 sm:text-4xl lg:text-5xl xl:text-7xl">
        {{ room?.code }}
      </div>
      <div class="pin-actions">
        <button class="flex gap-2 justify-center items-center" @click="copyPin">
          <Copy /> {{ `Copy Link` }}
        </button>
        <!-- <button @click="hidePin">Hide</button> -->
      </div>
    </div>
    <div class="qr-code">
      QR Code
      <div class="bg-white p-2 rounded-lg">
        <QrCodeVue class="w-32 h-32" :qrCodeValue="roomLink" />
      </div>
    </div>
  </div>
  <div class="main-content-host">
    <div class="waiting-area">
      <p>Join on this device</p>
      <h3 v-if="useRoomStore().roomParticipants?.length === 0">
        Waiting for players
      </h3>
      <div v-else class="player-container">
        <div
          v-for="player in useRoomStore().roomParticipants"
          :key="player.username">
          <div class="player w-24 flex flex-col items-center gap-2">
            <img
              src="@/assets/img/default_avt.jpg"
              alt="Player Avatar"
              class="rounded-full w-16 h-16" />
            <p class="text-sm">{{ player.username }}</p>
          </div>
        </div>
      </div>
      <Button
        :variant="'success'"
        @click="handleNextQuestion"
        class="start-game-btn"
        :disabled="useRoomStore().roomParticipants?.length === 0">
        Start game
      </Button>
    </div>
    <div class="settings flex flex-col justify-center items-center gap-4">
      <!-- <div class="presentation-info">
            <img src="https://via.placeholder.com/80x80" alt="Presentation Image" />
            <h3>JavaScript</h3>
            <p>8 slides</p>
          </div> -->
      <div class="sound-settings">
        <h4>Sound</h4>
        <div class="slider-group">
          <label>Music</label>
          <input type="range" min="0" max="100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QrCodeVue from "~/components/Common/QrCode.vue";
import type { RoomRes } from "~/types/room";
import { useToast } from "../ui/toast/use-toast";

const { toast } = useToast();

import { Copy, QrCode } from "lucide-vue-next";

const { $quizzAppSDK } = useNuxtApp();

const isLinkCopied = ref(false);
const props = defineProps({
  room: {
    type: Object as PropType<RoomRes>,
    required: true,
  },
});

const roomLink = computed(() => {
  return (
    "localhost:4200" + "/room/" + props.room.id + "?code=" + props.room.code
  );
});

function copyPin() {
  navigator.clipboard.writeText(roomLink.value);
  toast({
    title: "Link copied!",
    description: "You can now share the link with your friends",
    variant: "success",
  });
}

function hidePin() {
  alert("PIN hidden!");
}

const handleNextQuestion = async () => {
  $quizzAppSDK.nextQuestion(
    useRoomStore().questionIds[useRoomStore().currentQuestionIndex],
    props.room.id
  );

  const currentQuestionId =
    useRoomStore().questionIds[useRoomStore().currentQuestionIndex];

  if (currentQuestionId) {
    useRoomStore().currentQuestion = await $quizzAppSDK.getDetailQuestion(
      currentQuestionId
    );
  }

  useRoomStore().currentQuestionIndex++;

  const nextQuestionInterval = setInterval(
    async () => {
      try {
        const questionId =
          useRoomStore().questionIds[useRoomStore().currentQuestionIndex];

        $quizzAppSDK.nextQuestion(questionId, props.room.id);
        useRoomStore().currentQuestion = await $quizzAppSDK.getDetailQuestion(
          useRoomStore().questionIds[useRoomStore().currentQuestionIndex]
        );
      } catch (error) {
        console.error("Error fetching next question:", error);
      }
      useRoomStore().currentQuestionIndex++;
      if (
        useRoomStore().currentQuestionIndex > useRoomStore().questionIds.length
      ) {
        console.log("End of quiz");
        navigateTo(
          "/room/" + props.room.id + "/result" + "?code=" + props.room.code
        );
        clearInterval(nextQuestionInterval);
        return;
      }
    },

    (useRoomStore().currentQuestion.time * 1000) / 6
  );
};
</script>

<style scoped lang="scss"></style>
