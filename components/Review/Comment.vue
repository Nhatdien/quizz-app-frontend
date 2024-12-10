<template>
  <div class="comment">
    <div class="flex gap-4">
      <img
        class="rounded-circle border border-[black] rounded-full"
        src="@/assets/img/default_avt.jpg"
        width="40"
        height="40" />
      <h3>{{ comment.username }}</h3>
    </div>
    <p>{{ comment.content }}</p>
    <Comment v-for="reply in comment.replies" :comment="reply" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  comment: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<style scoped lang="scss"></style>
