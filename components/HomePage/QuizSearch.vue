<template>
  <div class="flex items-center gap-4 flex-grow">
    <transition name="stretch">
      <QuizSearchBox v-if="isSearchBoxVisible" @blur="hideSearchBox" />
    </transition>
    <Button class="rounded-full" @click="toggleSearchBox">
      <Search :size="32" :stroke-width="3" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";

const isSearchBoxVisible = ref(false);

function toggleSearchBox() {
  isSearchBoxVisible.value = !isSearchBoxVisible.value;
}

function hideSearchBox() {
  isSearchBoxVisible.value = false;
}
</script>

<style scoped>
.stretch-enter-active,
.stretch-leave-active {
  transition: transform 0.5s;
}
.stretch-enter-from,
.stretch-leave-to {
  transform: scaleY(0);
}
</style>
