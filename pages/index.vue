<template>
  <div>
    <h1>Find a quiz</h1>
    <QuizSearchBox />
    {{ code }}
    <Input v-model="code"> </Input>

    <Button @click="hanleClickJoinRoom" class="mt-5">Join Room</Button>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import QuizSearchBox from "~/components/Quiz/QuizSearchBox.vue";
import type { Question } from "~/types/quiz";

const { $keycloak, $quizzAppSDK } = useNuxtApp();
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

const code = ref("");

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
  useRoomStore().currentQuestionIndex++;

};

const hanleClickJoinRoom = async () => {
  const room = await $quizzAppSDK.getRoomByCode(code.value);
  $quizzAppSDK.joinRoom(
    room.id,
    code.value,
    $keycloak.getTokenParsed()?.preferred_username,
    receiveQuesitonCallback
  );

  if (room && room.isActive) {
    navigateTo(`/room/${room.id}?code=${code.value}`);
  }
};
onMounted(async () => {});
</script>
