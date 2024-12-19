<template>
  <div class="flex items-center gap-4 rounded-sm py-4 pr-4">
    <BrainCogIcon fill="#F8BBD0" size="60"></BrainCogIcon>
    <h1 @click="navigateTo('/')" class="logo-text rounded-lg cursor-pointer">
      <span style="color: #64B5F6;">Clever</span><span style="color: #FF8A65;">Mind</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { BrainCogIcon } from "lucide-vue-next";
</script>
