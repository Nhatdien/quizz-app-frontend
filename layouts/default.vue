<template>
  <div class="body-container">
    <div :class="'main-content'">
      <LogoSection />
      <HomePageUserAuthSection />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoSection from '~/components/HomePage/LogoSection.vue';
</script>
