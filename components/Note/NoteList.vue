<template>
  <NoteCreateNoteDialog :currentQuizInfo />
  <NoteCard v-for="note in currentNotes" :key="note.id" :note  />
</template>

<script setup lang="ts">
import * as NoteTypes from "~/types/note";

const currentNotes = computed<NoteTypes.NoteResponse[]>(() => {
  return useNoteStore().notes;
});

const currentQuizInfo = computed<{
  questionId: string;
  quizId: string;
}>(() => {
  return {
    questionId: useQuizStore().currentQuestionId,
    quizId: useRoute().params.quiz_id as string,
  };
});
</script>
