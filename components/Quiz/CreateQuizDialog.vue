<template>
  <ClientOnly />
  <Dialog v-model:open="isOpen">
    <DialogTrigger v-model="isOpen" as-child>
      <slot name="trigger">
        <Button class="m-4">
          {{ "+ Create" }}
        </Button>
      </slot>
    </DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle> Create Quiz </DialogTitle>
        <DialogDescription>
          {{ "Create a new quiz" }}
        </DialogDescription>
      </DialogHeader>
      <div v-if="step === 1">
        <div
          @click="step = 2"
          class="card m-4 p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition duration-300">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"></path>
            </svg>
            <h3 class="text-lg font-semibold">Manually Create</h3>
          </div>
          <p class="text-gray-600">
            Create a quiz manually by entering questions and answers.
          </p>
        </div>
        <div
          @click="step = 3"
          class="card m-4 p-4 border rounded shadow cursor-pointer hover:bg-gray-100 transition duration-300">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"></path>
            </svg>
            <h3 class="text-lg font-semibold">Import Excel File</h3>
          </div>
          <p class="text-gray-600">
            Import questions and answers from an Excel file.
          </p>
        </div>
      </div>
      <QuizCreateQuizForm v-model="isShow" v-if="step == 2" />
      <CommonUploadFile
        :accept="'.xlsx'"
        :show-upload="true"
        :upload-path="'/quiz/import'"
        v-if="step == 3" />

      <a
        href="https://docs.google.com/spreadsheets/d/1ic9jFZXZxCQm5m2VM6tp-zuApT3SAJOoD6e-Mk6ffJg/edit?gid=525658875#gid=525658875"
        target="_blank">
        Go here for the template
      </a>
    </DialogContent>
  </Dialog>
  <ClientOnly />
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const isOpen = ref(false);
const step = ref(1);

watchEffect(() => {
  if (isOpen.value) {
    step.value = 1;
  }
});
</script>
