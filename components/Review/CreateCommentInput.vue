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
    <Textarea
      v-model="currentCommentInput.content"
      placeholder="Write a comment..."
      class="w-full mt-4"
      type="textarea" />
    <div class="flex justify-end gap-4 mt-4">
      <button @click="cancelComment" class="underline">Cancel</button>
      <Button @click="submitComment" class="underline text-base">Submit</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
type inPutInfoProp = {
  quizzId: string;
  parentCommentId?: string | null;
  reviewId: string;
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
  reviewId: "",
  username: "",
  quizzId: "",
  parentCommentId: null as string | null,
});

const emit = defineEmits(["update:isShow"]);

const submitComment = () => {
  useReviewStore().createComment({
    ...currentCommentInput,
  });
  emit("update:isShow", false);
  // console.log({...currentCommentInput});
};

const cancelComment = () => {
  emit("update:isShow", false);
};

onMounted(() => {
  currentCommentInput.username = props.inputInfo.username;
  currentCommentInput.quizzId = props.inputInfo.quizzId;
  currentCommentInput.reviewId = props.inputInfo.reviewId;
  currentCommentInput.parentCommentId = props.inputInfo.parentCommentId || null;
  currentCommentInput.content = props.inputInfo.content || "";
});
</script>

<style scoped lang="scss"></style>
