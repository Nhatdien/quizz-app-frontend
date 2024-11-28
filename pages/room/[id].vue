<template>
  <pre>{{ currentRoom }}</pre>
  {{ route.query.code }}
  <pre>{{ useRoomStore().questionIds }}</pre>

  <Button @click="handleNextQuestion" class="ml-4"> Start Quiz </Button>
</template>

<script setup lang="ts">
const { $quizzAppSDK } = useNuxtApp();

const currentRoom = computed(() => {
  return useRoomStore().room;
});

const route = useRoute();
const handleNextQuestion = async () => {
  $quizzAppSDK.nextQuestion(
    useRoomStore().questionIds[0],
    currentRoom.value.id
  );
};

onMounted(async () => {
  const room = await useRoomStore().getRoomByCode(route.query.code as string);
  useRoomStore().quizId = route.query.quizId as string;
  await $quizzAppSDK.getQuestionIds(useRoomStore().quizId);
});
</script>
