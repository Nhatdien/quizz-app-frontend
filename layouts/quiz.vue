<template>
  <div class="body-container">
    <div :class="'main-content'">
      <div class="flex justify-between items-center">
        <LogoSection />
        <HomePageUserAuthSection />
      </div>
      <Separator class="my-8"/>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoSection from "~/components/HomePage/LogoSection.vue";
</script>
