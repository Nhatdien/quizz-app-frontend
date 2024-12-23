<template>
  <div class="flex items-center gap-4 flex-grow">
    <transition-group name="stretch" tag="div" class="flex items-center gap-4 flex-grow">
      <QuizSearchBox v-if="model" @blur="toggleSearchBox" key="search-box" />
      <button
        key="search-button"
        class="bg-gray-200 text-black p-2 md:p-4 rounded-full shadow-md hover:bg-gray-300 transition"
        @click="toggleSearchBox">
        <Search :stroke-width="3" class="w-4 h-4 md:w-6 md:h-6" />
      </button>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";

const isSearchBoxVisible = ref(false);

const model = defineModel<boolean>();

function toggleSearchBox() {
    model.value = !model.value;
}

function hideSearchBox() {
  isSearchBoxVisible.value = false;
}
</script>

<style scoped>
.stretch-enter-active,
.stretch-leave-active {
  transition: transform 0.2s, margin 0.1s;
}
.stretch-enter-from,
.stretch-leave-to {
  transform: scaleY(0);
  margin-left: 0;
}
</style>
