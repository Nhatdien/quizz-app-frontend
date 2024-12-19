<template>
  <div class="flex flex-wrap gap-4 justify-center py-6 w-full">
    <!-- Box 1 -->
    <CardBox class="flex-1">
      <template #image>
        <!-- <img
            src="/images/quiz-editor-icon.png"
            alt="Create Quiz"
            class="w-20 h-20"
          /> -->
      </template>
      <template #title>Create a quiz</template>
      <template #description> Play for free </template>
      <template #button>
        <CreateQuizDialog>
          <template #trigger>
            <button
              class="bg-[#60D4FC] text-black px-4 py-2 rounded-md shadow-md hover:bg-[#47C3ED] transition">
              + Create quiz
            </button>
          </template>
        </CreateQuizDialog>
      </template>
    </CardBox>

    <!-- Box 2 -->
    <CardBox class="flex-1">
      <template #image>
        <!-- <img
            src="/images/quiz-generator-icon.png"
            alt="AI Quiz Generator"
            class="w-20 h-20"
          /> -->
      </template>
      <template #title>
        <div class="flex gap-2 items-center">
          <Bot :size="32" stroke-width="2" /> A.I
        </div></template
      >
      <template #description>
        Generate a quiz from <strong>any subject</strong>
      </template>
      <template #button>
        <button
          class="bg-[#60D4FC] text-black px-4 py-2 rounded-md shadow-md hover:bg-[#47C3ED] transition"
          @click="navigateTo('/quiz/generate')">
          Quiz generator
        </button>
      </template>
    </CardBox>
  </div>
</template>

<script setup>
import CardBox from "@/components/Common/CardBox.vue";
import CreateQuizDialog from "../Quiz/CreateQuizDialog.vue";
import { Bot } from "lucide-vue-next";
</script>
