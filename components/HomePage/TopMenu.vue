<template>
  <div
    :class="[
      'flex sm:gap-8 md:gap-8 justify-around items-center',
      { 'search-active': isSearchActive && isMediumOrBelow },
    ]">
    <LogoSection
      class="logo-section"
      :class="{
        none: isSearchActive,
      }" />
    <JoinRoomInput v-show="useScreen().isLargerThanMedium" />
    <QuizSearch class="flex-shrink" v-model="isSearchActive" />
    <UserAuthSection class="user-auth-section" />
  </div>
  <Separator class="my-4" />
</template>

<script setup lang="ts">
import UserAuthSection from "~/components/HomePage/UserAuthSection.vue";
import LogoSection from "~/components/HomePage/LogoSection.vue";
import QuizSearch from "~/components/HomePage/QuizSearch.vue";
import JoinRoomInput from "~/components/HomePage/JoinRoomInput.vue";
import { ref, computed } from "vue";
import { useScreen } from "~/composables/useScreen"; // Assuming you have a useScreen composable

const isSearchActive = ref(false);
const screen = useScreen();



const handleSearchClick = () => {
  if (!screen.isLargerThanMedium) {
    toggleSearch();
  }
};

const isMediumOrBelow = computed(() => !screen.isLargerThanMedium);

function toggleSearch() {
  isSearchActive.value = !isSearchActive.value;
}
</script>

<style scoped>
.flex {
  transition: transform 0.3s ease-in-out;
}

.flex.search-active .logo-section {
  transform: translateX(-300%);
  position: absolute;
}

.user-auth-section {
  flex-shrink: 0;
}
</style>
