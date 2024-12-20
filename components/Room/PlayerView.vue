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
        <h3>Waiting for players</h3>

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
  
    useRoomStore().currentQuestionIndex++;
  
    const nextQuestionInterval = setInterval(
      async () => {
        const questionId =
          useRoomStore().questionIds[useRoomStore().currentQuestionIndex];
  
        $quizzAppSDK.nextQuestion(questionId, props.room.id);
        if (
          useRoomStore().currentQuestionIndex >= useRoomStore().questionIds.length
        ) {
          console.log("End of quiz");
          clearInterval(nextQuestionInterval);
          return;
        }
        useRoomStore().currentQuestionIndex++;
      },
  
      useRoomStore().questionIds.length ? 5000 : 0
    );
  };
  </script>
  
  <style scoped lang="scss"></style>
  