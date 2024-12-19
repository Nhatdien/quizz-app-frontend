<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { $keycloak, $quizzAppSDK } = useNuxtApp();

onMounted(async () => {
  try {
    await waitForToken();

    if (useTopicStore().topics.length === 0) {
      useTopicStore().getTopics({
        textSearch: "",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
</script>
