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
import { defineProps } from "vue";

const props = defineProps<{
  options: { label: string; value: any }[];
  groupLabel: string;
}>();

const selectedValue = ref<string>();
</script>

<template>
  <Select>
    <SelectTrigger class="max-w-36 text-black">
      <SelectValue placeholder="Select time" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ props.groupLabel }}</SelectLabel>
        <SelectItem
          v-for="option in props.options"
          :key="option.value"
          :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
