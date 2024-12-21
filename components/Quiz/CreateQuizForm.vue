<template>
  <div class="w-full">
    <Form class="flex flex-col gap-8">
      <FormItem label="Quiz Title">
        <Input v-model="quizTitle" placeholder="Enter quiz title" />
        <div class="flex flex-col" v-if="v$.quizTitle.$error">
          <span v-if="v$.quizTitle.required" class="text-red-500">{{
            v$.quizTitle.required.$message
          }}</span>
          <!-- 
          <span v-if="v$.quizTitle.minLength" class="text-red-500">{{
            v$.quizTitle.minLength.$message
          }}</span> -->
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
      <FormItem label="Quiz Topic">
        <!-- {{topicCode}} -->
        <QuizTopicSearchBox />
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
        <CommonUploadFile :accept="'image/*'" v-model="uploadImage" />
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
import { useToast } from "@/components/ui/toast/use-toast";

const quizTitle = ref("");
const quizDescription = ref("");
const topicCode = ref("");
const uploadImage = ref<File | null>(null);

const { $quizzAppSDK } = useNuxtApp();
const showDialogModelValue = defineModel<boolean>();

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
    topicCode: useTopicStore().topicCodeSelected,
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

const submitForm = async () => {
  v$.value.$validate();

  let imageLink = "" as string | null;
  if (v$.value.$invalid !== true) {
    if (uploadImage.value) {
      const res = (await $quizzAppSDK.uploadFile(
        uploadImage.value,
        "/upload/image"
      )) as Response;
      if (!res.body) {
        throw new Error("Response body is null");
      }
      const reader = res.body.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            controller.enqueue(value);
          }
          controller.close();
        },
      });
      const responseText = await new Response(stream).text();
      imageLink = responseText ? responseText : null;
      
      responseText ? (imageLink = responseText) : (imageLink = null);
    }

    const quizStoreLength = useQuizStore().quiz.length || 1;
    console.log(createQuizPayload.value, useTopicStore().topicCodeSelected);
    try {
      useTryCatch().tryCatch(async () => {
        await useQuizStore().createQuiz({
          ...createQuizPayload.value,
          imageUrl: imageLink ? imageLink : null,
        });
      });
      showDialogModelValue.value = false;
      // await useQuizStore().createQuiz({
      //   ...createQuizPayload.value,
      //   imageUrl: imageLink ? imageLink : null,
      // });

      // useToast().toast({
      //   title: "Quiz created successfully!",
      //   description: "You can now add questions to the quiz.",
      //   variant: "success",
      // })

      // navigateTo(`/quiz/${useQuizStore().quiz[quizStoreLength - 1].id}/view`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  }
  // Add your form submission logic here
};

watch(
  () => useTopicStore().topicCodeSelected,
  (value) => {
    topicCode.value = value;
  }
);
</script>
