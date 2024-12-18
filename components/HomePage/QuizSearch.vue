<template>
  <div class="flex items-center gap-4 flex-grow">
    <Button class="rounded-full w-8 h-8" @click="toggleSearchBox">
      <Search />
    </Button>
    <transition name="stretch">
      <QuizSearchBox v-if="isSearchBoxVisible" @blur="hideSearchBox" />
    </transition>
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
