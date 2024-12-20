<template>
  <div class="review-item sm:mb-4 md:mb-0">
    <div class="review-pin"></div>
    <div class="paper__content">
      <div class="paper__header">
        <h2 class="paper__title">{{ note?.title }}</h2>
      </div>
      <div class="paper__body">
        <p class="paper__text">{{ note?.note }}</p>
      </div>
      <div class="paper__footer flex justify-end items-center gap-2">
        <NoteCreateNoteDialog :is-eding-note="true" :current-quiz-info :note />
        <AlertDialog :option="handleDeleteNoteOption(note.id)">
          <template #trigger>
            <Button :variant="'destructive'"><Trash /></Button>
          </template>
        </AlertDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as NoteTypes from "~/types/note";
import AlertDialog from "../Common/AlertDialog.vue";
import { Trash, Image, Pencil } from "lucide-vue-next";

const props = defineProps({
  currentQuizInfo: {
    type: Object as PropType<{ questionId: string; quizId: string }>,
    required: true,
  },

  note: {
    type: Object as PropType<NoteTypes.NoteResponse>,
    required: true,
  },
});

const handleDeleteNoteOption = (noteID: string) => {
  return {
    title: "Delete Question",
    description: "Are you sure you want to delete this question?",
    actionText: "Delete",
    action: async () => {
      await useNoteStore().deleteNote(noteID);
    },
  };
};
</script>

<style scoped></style>
