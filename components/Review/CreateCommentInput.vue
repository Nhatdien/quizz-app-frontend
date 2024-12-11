<template>
  <div class="comment">
    <div class="flex gap-4">
      <img
        class="rounded-circle border border-[black] rounded-full"
        src="@/assets/img/default_avt.jpg"
        width="40"
        height="40" />
      <h3>{{ currentCommentInput.username }}</h3>
    </div>
    <p>{{ currentCommentInput.content }}</p>
    <Textarea
      v-model="currentCommentInput.content"
      placeholder="Write a comment..."
      class="w-full mt-4"
      type="textarea" />
    <div class="flex justify-end gap-4 mt-4">
      <button @click="cancelComment" class="underline">Cancel</button>
      <button @click="submitComment" class="underline">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
type inPutInfoProp = {
  quizId: string;
  parentCommentId?: string;
  username: string;
  content?: string;
};
const props = defineProps({
  isShow: {
    type: Boolean,
    required: false,
    default: false,
  },

  inputInfo: {
    type: Object as PropType<inPutInfoProp>,
    required: true,
  },
});

const currentCommentInput = reactive({
  content: "",
  username: "",
  quizId: "",
  parentCommentId: "",
});

const emit = defineEmits(["update:isShow"]);

const submitComment = () => {};

const cancelComment = () => {
  emit("update:isShow", false);
};

onMounted(() => {
  currentCommentInput.username = props.inputInfo.username;
  currentCommentInput.quizId = props.inputInfo.quizId;
  currentCommentInput.parentCommentId = props.inputInfo.parentCommentId || "";
  currentCommentInput.content = props.inputInfo.content || "";
});
</script>

<style scoped lang="scss"></style>
