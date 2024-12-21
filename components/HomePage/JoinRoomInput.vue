<template>
  <div class="review-item bg-[#FFF3E0] flex justify-center items-center">
    <div class="review-pin "></div>
    <div class="flex gap-4">
      <span class="w-full font-bold">Join Game? Enter PIN:</span>
      <Input v-model="code" @keyup.enter="hanleClickJoinRoom"> </Input>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Question } from "~/types/quiz";
import { ref } from "vue";
import { useNuxtApp, useRoomStore, navigateTo } from "#imports";

const code = ref("");
const { $keycloak, $quizzAppSDK } = useNuxtApp();




const hanleClickJoinRoom = async () => {
  const room = await $quizzAppSDK.getRoomByCode(code.value);
  $quizzAppSDK.joinRoom(
    room.id,
    code.value,
    $keycloak.getTokenParsed()?.preferred_username,
    useRoomStore().receiveQuesitonCallback
  );

  await useRoomStore().getQuestionIds(room.quizzId);

  if (room && room.isActive) {
    navigateTo(`/room/${room.id}?code=${code.value}`);
  }
};
</script>
