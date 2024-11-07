<template>
  <div>
    <ClientOnly>
      <CreateQuestion />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useTopicStore } from "@/stores/stores/topic";
import { useAuthStore } from "@/stores/stores/auth";
import CreateQuestion from "~/components/Questions/CreateOrEditQuestion.vue";

const { $keycloak } = useNuxtApp();
const loading = ref(false);

const topicStore = useTopicStore();
const body = ref("");
const { data: _, status } = await useAsyncData("topics", async () => {
  const response = await topicStore.getTopic("CODE");
  return response;
});

onMounted(async () => {

});
</script>
