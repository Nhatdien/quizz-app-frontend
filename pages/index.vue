<template>
  <div>
    <h1>Find a quiz</h1>
    <QuizSearchBox />
    {{ code }}
    <Input v-model="code">
    </Input>

    <Button @click="hanleClickJoinRoom" class="mt-5">Join Room</Button>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import PreviewQuiz from "~/components/Quiz/PreviewQuiz.vue";
import QuizSearchBox from "~/components/Quiz/QuizSearchBox.vue";
import brain from "~/assets/icons/brain.vue";

const { $keycloak, $quizzAppSDK } = useNuxtApp();
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

const code = ref("");

const hanleClickJoinRoom = async () => {
  const room = await $quizzAppSDK.getRoomByCode(code.value);
  $quizzAppSDK.joinRoom(
    room.id,
    code.value,
    $keycloak.getTokenParsed()?.preferred_username
  );

  if(room && room.isActive){
    navigateTo(`/room/${room.id}code=${code.value}`);
  }
};
onMounted(async () => {});
</script>
