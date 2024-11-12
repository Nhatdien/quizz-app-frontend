<template>
  <ClientOnly>
    <QuillEditor
      v-model:content="content"
      :options="options"
      content-type="html" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  modelValue: String,
  options: Object,
});

const emit = defineEmits(["update:modelValue"]);
const content = ref(props.modelValue);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction

  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],

  ["clean"], // remove formatting button
];

const options = ref({
  modules: {
    toolbar: toolbarOptions,
  },
  placeholder: "Write something...",
  theme: "snow",
  readOnly: false,
});

watch(content, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => props.modelValue,
  (newVal) => {
    content.value = newVal;
  }
);
</script>
