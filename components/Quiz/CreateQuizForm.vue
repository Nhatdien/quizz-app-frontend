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
      <MyTabs v-model="currentTab" :tabOptions="tabOptions">
        <template #tab-trigger-new> Create new topic </template>

        <template #tab-trigger-existing> Use existing topic </template>
        <template #tab-content-new>
          <!-- <TopicSearchBox /> -->
          <FormItem label="Topic Name">
            <Input
              v-model="newTopicInput.topicTitle"
              placeholder="Enter topic title" />
            <Input
              v-model="newTopicInput.topicCode"
              placeholder="Enter topic code" />
            <Textarea
              v-model="newTopicInput.topicDescription"
              placeholder="Enter topic description" />
            <div v-if="v$.topicCode.$error">
              <span v-if="v$.topicCode.$pending" class="text-yellow-500"
                >Validating...</span
              >
              <span v-if="v$.topicCode.required" class="text-red-500">{{
                v$.topicCode.required.$message
              }}</span>
            </div>
          </FormItem>
        </template>
        <template #tab-content-existing>
          <FormItem label="Quiz Topic">
            <MySelect
              v-model="topicCode"
              :isFilter="true"
              :options="topicNameMap"
              :placeholderFlte="{
                placeholderFilter: 'Type to search for topic...',
                placeholderSelect: 'Select a topic...',
              }" />
            <div v-if="v$.topicCode.$error">
              <span v-if="v$.topicCode.$pending" class="text-yellow-500"
                >Validating...</span
              >
              <span v-if="v$.topicCode.required" class="text-red-500">{{
                v$.topicCode.required.$message
              }}</span>
            </div>
          </FormItem>
        </template>
      </MyTabs>

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
import MyTabs from "../Common/MyTabs.vue";
import MySelect from "../Common/MySelect.vue";

const quizTitle = ref("");
const quizDescription = ref("");
const topicCode = ref("");
const currentImageLink = ref<string | null>("");
const uploadImage = ref<File | null>(null);
const currentTab = ref("existing");
const newTopicInput = reactive({
  topicCode: "",
  topicTitle: "",
  topicDescription: "",
});

const isNewTopicValid = computed(() => {
  return (
    newTopicInput.topicCode.length > 0 &&
    newTopicInput.topicTitle.length > 0 &&
    newTopicInput.topicDescription.length > 0
  );
});

const topicNameMap = computed(() => {
  return useTopicStore().topics.map((topic) => ({
    value: topic.code,
    label: topic.title,
  }));
});

const { $quizzAppSDK } = useNuxtApp();
const showDialogModelValue = defineModel<boolean>();
const showDialogNewTopic = ref(false);

const rules = {
  quizTitle: { required, minLength: minLength(3) },
  quizDescription: { required },
  topicCode: { required },
};

const tabOptions = [
  {
    value: "new",
    label: "Create new topic",
  },
  {
    value: "existing",
    label: "Use existing topic",
  },
];

const v$ = useVuelidate(rules, {
  quizTitle,
  quizDescription,
  topicCode: currentTab.value === "new" ? newTopicInput.topicCode : topicCode,
});

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

const submitUploadFile = async () => {
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
    currentImageLink.value = responseText ? responseText : null;

    responseText
      ? (currentImageLink.value = responseText)
      : (currentImageLink.value = null);
  }
};

const createQuiz = async () => {
  const payload = { ...createQuizPayload.value };
  if (currentTab.value === "new") {
    await useTopicStore().createTopic({
      code: newTopicInput.topicCode,
      title: newTopicInput.topicTitle,
      description: newTopicInput.topicDescription,
    });
    await delay(500);
    payload.topicCode = useTopicStore().createdTopic.code;
    await submitUploadFile();
    await useQuizStore().createQuiz({
      ...payload,
      imageUrl: currentImageLink.value,
    });
    navigateTo(`/quiz/${useQuizStore().quiz[quizStoreLength - 1].id}/view`);
  }

  if (currentTab.value === "existing") {
    await submitUploadFile();

    await useQuizStore().createQuiz({
      ...createQuizPayload.value,
      imageUrl: currentImageLink.value,
    });
    navigateTo(`/quiz/${useQuizStore().quiz[quizStoreLength - 1].id}/view`);
  }
};

const submitForm = async () => {
  // v$.value.$validate();

  let imageLink = "" as string | null;
  // if (v$.value.$invalid !== true) {

  const quizStoreLength = useQuizStore().quiz.length || 1;
  console.log(createQuizPayload.value, useTopicStore().topicCodeSelected);
  try {
    // useTryCatch().tryCatch(async () => {
    //   await useQuizStore().createQuiz({
    //     ...createQuizPayload.value,
    //     imageUrl: imageLink ? imageLink : null,
    //   });
    // });
    await useTryCatch().tryCatch(createQuiz);
    showDialogModelValue.value = false;
  } catch (error) {
    console.error("Error creating quiz:", error);
  }
  // }
  // Add your form submission logic here
};

watch(
  () => useTopicStore().topicCodeSelected,
  (value) => {
    topicCode.value = value;
  }
);
</script>
