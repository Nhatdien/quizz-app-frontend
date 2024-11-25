<script setup lang="ts">
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import type { Quiz } from "@/types/quiz";

const defaultStringIfSoCommand = "Type a command or search...";
let timeout: ReturnType<typeof setTimeout> | null = null;

const searchResults = ref<Quiz[]>([]);
const isLoading = ref(false);

const quizNameMap = computed(() => {
  return searchResults.value.map((quiz) => ({
    value: quiz.id,
    label: quiz.title,
  }));
});

const onInputQuizSearch = (event: Event) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  isLoading.value = true;
  timeout = setTimeout(async () => {
    const response = await useQuizStore().searchQuiz({
      textSearch:
        (event.target as HTMLInputElement).value || "defaultStringIfSoCommand",
    });
    searchResults.value = response.content;
  }, 1000);
  isLoading.value = false;
};
</script>

<template>
  <Command>
    <CommandInput
      @input="onInputQuizSearch"
      placeholder="Type a command or search..." />
    <CommonLoadSpinner v-if="isLoading" />
    <CommandList v-else>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem
          v-for="quiz in quizNameMap"
          :key="quiz.value"
          :value="quiz.label"
          :class="'cursor-pointer'"
          @click="() => navigateTo(`/quiz/${quiz.value}/join?preview=true`)">
          {{ quiz.label }}
        </CommandItem>
      </CommandGroup>
      <!-- <CommandSeparator />/ -->
    </CommandList>
  </Command>
</template>
