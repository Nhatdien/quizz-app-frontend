<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useToast } from "./components/ui/toast/use-toast";
import cookie from "cookie"
const { toast } = useToast();

const { $keycloak, $quizzAppSDK } = useNuxtApp();


onMounted(async () => {
  console.log(cookie)
  try {
    await waitForToken();

    if (useTopicStore().topics.length === 0) {
      useTopicStore().getTopics({
        textSearch: "",
        pageSize: 100,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
</script>
