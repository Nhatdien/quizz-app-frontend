<template>
  <div class="body-container">
    <div :class="'main-content'">
      <TopMenu/>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoSection from '~/components/HomePage/LogoSection.vue';
import TopMenu from '~/components/HomePage/TopMenu.vue';
</script>
