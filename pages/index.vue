<template>
  <div>
    {{ error }}
    <ClientOnly>
      <Test />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useTopicStore } from "@/stores/stores/topic";
import Quill from "~/components/Common/Quill.vue";
import Test from "~/components/Common/Test.vue";

const loading = ref(false);

const topicStore = useTopicStore();
const body = ref("");
const { data, status, error } = await useAsyncData("topics", async () => {
  loading.value = true;
  const response = await topicStore.fetchTopics();
  loading.value = false;

  return response.data;
});
</script>
