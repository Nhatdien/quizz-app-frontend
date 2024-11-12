<template>
  <div>
    <ClientOnly>
      {{ quizStore.quiz }} {{ topicStore.topics }}
      <CreateQuestion />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import CreateQuestion from "~/components/Questions/CreateOrEditQuestion.vue";

const topicStore = useTopicStore();
const quizStore = useQuizStore();

const { data: _, status } = await useAsyncData("quiz", async () => {
  const response = await quizStore.getQuiz("272c3b64a06d40de8776f1e28ef44171");
});

onMounted(async () => {

});
</script>
