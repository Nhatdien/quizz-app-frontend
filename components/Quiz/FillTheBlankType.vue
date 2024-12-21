<script setup lang="ts">
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import { ref } from "vue";

const value = ref<string[]>([]);

const props = defineProps({
  inputLength: {
    type: Number,
    default: 5,
    required: true,
  },
});
</script>

<template>
  <PinInput id="pin-input" placeholder="○">
    <PinInputGroup>
      <PinInputInput
        :class="'border-2 border-gray-300 w-10 h-10 text-center text-2xl rounded-lg '"
        v-for="(id, index) in inputLength"
        :key="id"
        :index="index" />
    </PinInputGroup>
  </PinInput>
</template>
