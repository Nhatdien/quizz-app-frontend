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
import type { TopicType } from "@/types/topic";

const defaultStringIfSoCommand = "Type a command or search...";
let timeout: ReturnType<typeof setTimeout> | null = null;

const searchResults = ref<TopicType[]>([]);
const isLoading = ref(false);
const selectedTopic = ref<string | null>(null);
const inputValue = ref("");

const topicNameMap = computed(() => {
  return searchResults.value.length > 0
    ? searchResults.value.map((topic) => ({
        value: topic.code,
        label: topic.title,
      }))
    : useTopicStore().topics.map((topic) => ({
        value: topic.code,
        label: topic.title,
      }));
});

const onInputTopicSearch = (event: Event) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  selectedTopic.value = null;
  isLoading.value = true;
  inputValue.value = (event.target as HTMLInputElement).value;
  timeout = setTimeout(async () => {
    const response = await useTopicStore().filterTopics({
      textSearch: inputValue.value || defaultStringIfSoCommand,
    });
    searchResults.value = useTopicStore().topics;
    isLoading.value = false;
  }, 1000);
};

const onSelectTopic = (topicLabel: string, topicValue: string) => {
  inputValue.value = topicLabel;
  useTopicStore().topicCodeSelected = topicValue;
  selectedTopic.value = topicLabel;
};
</script>

<template>
  <Command>
    <!-- <CommandInput
      v-if="!useTopicStore().topicCodeSelected"
      v-model="inputValue"
      @input="onInputTopicSearch"
      placeholder="Type to search for topic...">
    </CommandInput> -->
    <div>
      <Input
        v-model="inputValue"
        @input="onInputTopicSearch"
        placeholder="Type to search for topic..." />
    </div>
    <CommonLoadSpinner v-if="isLoading" />
    <CommandList v-if="!selectedTopic">
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem
          v-for="topic in topicNameMap"
          :key="topic.value"
          :value="topic.label"
          :class="'cursor-pointer'"
          @click="onSelectTopic(topic.label, topic.value)">
          {{ topic.label }}
        </CommandItem>
      </CommandGroup>
      <!-- <CommandSeparator />/ -->
    </CommandList>
  </Command>
</template>
