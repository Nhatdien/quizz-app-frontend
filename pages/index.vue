<template>
  <div>
    <ClientOnly>
      <Button @click="useAuthStore().logout"> Logout</Button>
      {{ topicStore.topics }} {{ error }}
      <Test />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useTopicStore } from "@/stores/stores/topic";
import { useAuthStore } from "@/stores/stores/auth";
import Test from "~/components/Common/Test.vue";

const loading = ref(false);

const topicStore = useTopicStore();
const body = ref("");
const { data: _, status, error } = await useAsyncData("topics", async () => {
  
  return ;
});

onMounted(() => {
  const response = topicStore.fetchTopics();
});
</script>
