<template>
  <div>
    <ClientOnly>
      <Button @click="useAuthStore().logout"> Logout</Button>
      {{ topicStore.topics }} {{ status }}
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
const { data: _, status } = await useAsyncData("topics", async () => {
  const response = await topicStore.getTopic("CODE");
  
  return response;
});

onMounted(() => {

});
</script>
