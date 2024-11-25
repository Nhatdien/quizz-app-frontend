<template>
  <div class="w-full">
    <Form class="flex flex-col gap-8">
      <FormItem label="Quiz Title">
        <Input v-model="quizTitle" placeholder="Enter quiz title" />
        <div class="flex flex-col" v-if="v$.quizTitle.$error">
          <span v-if="v$.quizTitle.required" class="text-red-500">{{
            v$.quizTitle.required.$message
          }}</span>
          <span v-if="v$.quizTitle.minLength" class="text-red-500">{{
            v$.quizTitle.minLength.$message
          }}</span>
        </div>
      </FormItem>
      <FormItem label="Description">
        <Input v-model="quizDescription" placeholder="Enter quiz description" />
        <div v-if="v$.quizDescription.$error">
          <span v-if="v$.quizDescription.$pending" class="text-yellow-500"
            >Validating...</span
          >
          <span v-if="v$.quizDescription.required" class="text-red-500">{{
            v$.quizDescription.required.$message
          }}</span>
        </div>
      </FormItem>
      <FormItem label="Quiz Code">
        <Input
          @blur="(event: Event) => console.log(event?.target?.value)"
          v-model="topicCode"
          placeholder="Enter quiz topic" />
        <div v-if="v$.topicCode.$error">
          <span v-if="v$.topicCode.$pending" class="text-yellow-500"
            >Validating...</span
          >
          <span v-if="v$.topicCode.required" class="text-red-500">{{
            v$.topicCode.required.$message
          }}</span>
        </div>
      </FormItem>

      <FormItem label="Upload Image">
        {{ uploadImage }}
        <CommonUploadFile v-model="uploadImage" />
      </FormItem>
      <Button type="primary" @click.prevent="submitForm"
        ><bold class="text-xl">+</bold> Create Quiz</Button
      >
    </Form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const quizTitle = ref("");
const quizDescription = ref("");
const topicCode = ref("");
const uploadImage = ref<File | null>(null);

const rules = {
  quizTitle: { required, minLength: minLength(3) },
  quizDescription: { required },
  topicCode: { required },
};

const v$ = useVuelidate(rules, { quizTitle, quizDescription, topicCode });

const createQuizPayload = computed(() => {
  return {
    title: quizTitle.value,
    description: quizDescription.value,
    topicCode: topicCode.value,
    questions: [],
  };
});

async function uploadFile(): Promise<void> {
  if (!uploadImage.value) {
    alert("No file selected.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", uploadImage.value);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("File uploaded successfully!");
    } else {
      alert("Failed to upload the file.");
    }
  } catch (error) {
    console.error("Error uploading the file:", error);
    alert("An error occurred while uploading the file.");
  }
}

const submitForm = () => {
  v$.value.$validate();
  console.log(v$.value);
  if (v$.value.$invalid !== true) {
    // Add your form submission logic here

    console.log(createQuizPayload.value);
    navigateTo(`/quiz/${topicCode.value}`);
  }
  // Add your form submission logic here
};
</script>
