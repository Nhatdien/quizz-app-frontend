<template>
 <div class="ml-20">
 </div>
</template>

<script setup lang="ts">
import { useTopicStore } from '@/stores/stores/topic';

const loading = ref(false)

const topicStore = useTopicStore()

const {data, status, error} = await useAsyncData("topics", async () => {
  loading.value = true
  const response = await topicStore.fetchTopics()
  loading.value = false

  return response.data
})

</script>