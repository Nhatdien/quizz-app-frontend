<template>
  <div class="flex items-center gap-4 rounded-sm p-4">
    <BrainCogIcon fill='#ffa7a0' size="60"></BrainCogIcon>
    <h1 @click="navigateTo('/')" class="rounded-lg cursor-pointer">
      CleverMind
    </h1>
  </div>
</template>

<script setup lang="ts">
import { BrainCogIcon } from "lucide-vue-next";
</script>
