<template>
  <div class="flex justify-between items-center">
    <h2>Notes</h2>
    <NoteCreateNoteDialog :currentQuizInfo />
  </div>
  <NoteCard
    v-for="note in currentNotes"
    :currentQuizInfo
    :key="note.id"
    :note />
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
