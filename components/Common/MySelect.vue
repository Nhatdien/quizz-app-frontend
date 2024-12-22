<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defineProps, ref, computed } from "vue";

const props = defineProps<{
  options: { label: string; value: any }[];
  groupLabel?: string;
  isFilter: boolean;
  placeholder?: {
    placeholderFilter?: string;
    placeholderSelect?: string;
  };
}>();

const selectedValue = ref<string>();
const filterText = ref<string>("");

const filteredOptions = computed(() => {
  if (!props.isFilter) return props.options;
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(filterText.value.toLowerCase())
  );
});
</script>

<template>
  <Select>
    <SelectTrigger class="text-black" >
      <SelectValue :placeholder="placeholder?.placeholderSelect" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>
          <input
            v-if="props.isFilter"
            v-model="filterText"
            type="text"
            :placeholder="placeholder?.placeholderFilter"
            class="filter-input"
        /></SelectLabel>
        <SelectItem
          v-for="option in filteredOptions"
          :key="option.value"
          :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped>
.filter-input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
