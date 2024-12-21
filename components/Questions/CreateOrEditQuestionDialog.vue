
<template>
  <ClientOnly />
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline">
        {{ isEditButton ? "Edit" : "+ Add question" }}
      </Button>
    </DialogTrigger>
    <DialogContent class="h-[90vh] min-w-[90vw] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle>
          {{ isEditButton ? "Edit Question" : "Add question" }}
        </DialogTitle>
        <DialogDescription>
          {{
            isEditButton
              ? "Edit the question details"
              : "Add a new question to the quiz"
          }}
        </DialogDescription>
      </DialogHeader>
      <QuestionsCreateOrEditQuestion v-model="isOpen" :question="question"/>
    </DialogContent>
  </Dialog>
  <ClientOnly />
</template>

<script setup lang="ts">
import { Trash, Image, Clock } from "lucide-vue-next";
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
import type { Quiz, Question } from "~/types/quiz";


const isOpen = ref();
const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: false,
  },
  isEditButton: {
    type: Boolean,
    default: false,
  },
});

</script>
