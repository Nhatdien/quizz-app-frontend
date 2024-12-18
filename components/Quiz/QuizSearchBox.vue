<script setup lang="ts">
import type { Quiz } from "@/types/quiz";
import { useRouter } from 'vue-router';

const search = ref("");
const router = useRouter();

function onInputQuizSearch() {
  useQuizStore().searchQuiz({
    textSearch: search.value,
  })
  navigateTo(`/quiz?search=${search.value}`);
}

</script>

<template>
  <Input
    v-model="search"
    @keyup.enter="onInputQuizSearch"
    placeholder="Search for quizzes..."
  />
</template>
