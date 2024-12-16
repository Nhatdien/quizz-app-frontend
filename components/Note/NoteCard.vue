<template>
  <div class="review-item">
    <div class="review-pin"></div>
    <div class="paper__content">
      <div class="paper__header">
        <h2 class="paper__title">{{ note?.title }}</h2>
      </div>
      <div class="paper__body">
        <p class="paper__text">{{ note?.note }}</p>
      </div>
      <div class="paper__footer">
        <button class="btn btn--primary">Edit</button>
        <button class="btn btn--danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as NoteTypes from "~/types/note";

const props = defineProps({
  note: {
    type: Object as PropType<NoteTypes.NoteResponse>,
    required: true,
  },
});
</script>

<style scoped>
</style>
