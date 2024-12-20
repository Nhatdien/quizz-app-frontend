<template>
    <div class="flex items-center gap-4 rounded-sm py-4 pr-4">
      <BrainCogIcon class="logo-icon" fill="#F8BBD0"></BrainCogIcon>
      <div class="logo-text rounded-lg cursor-pointer">
        <span style="color: #64B5F6;">Clever</span><span style="color: #FF8A65;">Mind</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { BrainCogIcon } from "lucide-vue-next";
  </script>
  
  <style scoped>
  .logo-icon {
    width: 40px;
    height: 40px;
  }
  
  @media (min-width: 640px) {
    .logo-icon {
      width: 50px;
      height: 50px;
    }
  }
  
  @media (min-width: 768px) {
    .logo-icon {
      width: 60px;
      height: 60px;
    }
  }
  </style>
  