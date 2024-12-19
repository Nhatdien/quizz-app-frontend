<template>
  <div class="flex items-center gap-4 flex-grow">
    <transition name="stretch">
      <QuizSearchBox v-if="isSearchBoxVisible" @blur="hideSearchBox" />
    </transition>
    <button class="bg-gray-200 text-black p-2 md:p-4 rounded-full shadow-md hover:bg-gray-300 transition" @click="toggleSearchBox">
      <Search :stroke-width="3" class="w-4 h-4 md:w-6 md:h-6" />
    </button>
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
