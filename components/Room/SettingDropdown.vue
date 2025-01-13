<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DefineComponent, PropType } from "vue";
import { Settings } from "lucide-vue-next"

const audioSrc = "/audio/audio.mp3";

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot class="align-center" name="trigger"> <Settings :size="32" fill=""/> </slot>

    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <slot name="content"></slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
