<template>
  <div class="flex gap-8 justify-around items-center">
    <LogoSection />
    <JoinRoomInput v-if="useScreen().isLargerThanMedium" />
    <QuizSearch />
    <UserAuthSection />
  </div>
  <Separator class="my-4" />
</template>
<script setup lang="ts">
import UserAuthSection from "~/components/HomePage/UserAuthSection.vue";
import LogoSection from "~/components/HomePage/LogoSection.vue";
import QuizSearch from "~/components/HomePage/QuizSearch.vue";

import JoinRoomInput from "~/components/HomePage/JoinRoomInput.vue";
</script>
