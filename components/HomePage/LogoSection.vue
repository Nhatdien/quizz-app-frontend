<template>
  <div class="flex items-center gap-4 rounded-sm p-4">
    <BrainCogIcon fill="#ffa7a0" size="60"></BrainCogIcon>
    <h1 @click="navigateTo('/')" class="logo-text rounded-lg cursor-pointer">
      <span style="color: #6CA1D1;">Clever</span><span style="color: #ffa7a0;">Mind</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { BrainCogIcon } from "lucide-vue-next";
</script>
