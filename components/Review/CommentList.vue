<template>
  <div class="comment">
      <Comment v-for="comment in comments" :comment="comment"/>
  </div>
</template>

<script setup lang="ts">
import Comment from "./Comment.vue";
import type { PropType } from "vue";

const prop = defineProps({
  comments: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>
