<template>
  <div class="review-item flex justify-center items-center">
    <div class="review-pin"></div>
    <div class="flex gap-4">
      <span class="w-full">Join Game? Enter PIN:</span>
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

const handleAnswerSubmission = async (answer: string, question: Question) => {
  const isCorrect =
    question.answers.find((ans) => ans.isCorrect)?.content === answer;

  console.log(
    answer,
    question.answers.find((ans) => ans.isCorrect)?.content === answer
  );
  if (isCorrect) {
    useRoomStore().currentScore += question.point;
  }
};

const receiveQuesitonCallback = (question: any) => {
  console.log(JSON.parse(question.body));

  if (useRoomStore().currentQuestionIndex > 0) {
    handleAnswerSubmission(
      useRoomStore().currentSubmission[0][0],
      useRoomStore().currentQuestion
    );
  }

  const curQuestion = JSON.parse(question.body);
  useRoomStore().currentQuestion = curQuestion;
  useRoomStore().currentSubmission = [];
  useRoomStore().currentQuestionIndex += 1;

  if (
    useRoomStore().currentQuestionIndex >= useRoomStore().questionIds.length
  ) {
    const lastQuestionTimeOut = setTimeout(() => {
      handleAnswerSubmission(
        useRoomStore().currentSubmission[0][0],
        useRoomStore().currentQuestion
      );

      console.log("last question");
      useRoomStore().saveScore(
        $quizzAppSDK.config.current_username as string,
        useRoomStore().currentScore,
        useRoomStore().room.id
      );
      navigateTo(`/room/${useRoomStore().room.id}/result`);
      // useRoomStore().currentQuestion = {} as any;
      // useRoomStore().currentSubmission = [];
      // useRoomStore().currentQuestionIndex = 0;
      // clearInterval(lastQuestionInterval);
    }, (useRoomStore().currentQuestion.time * 1000) / 6);
  }
};

const hanleClickJoinRoom = async () => {
  const room = await $quizzAppSDK.getRoomByCode(code.value);
  $quizzAppSDK.joinRoom(
    room.id,
    code.value,
    $keycloak.getTokenParsed()?.preferred_username,
    receiveQuesitonCallback
  );

  await useRoomStore().getQuestionIds(room.quizzId);

  if (room && room.isActive) {
    navigateTo(`/room/${room.id}?code=${code.value}`);
  }
};
</script>
