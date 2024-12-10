<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PropType } from "vue";

type menuOptions = {
  label: string;
  items: {
    label: string;
    eventHandlers: {
      [key: string]: () => void;
    };
  }[];
};

const props = defineProps({
  menuOptions: {
    type: {} as PropType<menuOptions>,
    required: true,
  },
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot class="align-center" name="trigger"> ... </slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel v-if="menuOptions?.label">
        {{ menuOptions.label }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="item in menuOptions.items"
        :key="item.label"
        v-on="item?.eventHandlers">
        {{ item.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
