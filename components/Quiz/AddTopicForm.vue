<template>
  <FormItem label="Topic Name">
    <Input v-model="newTopicInput.topicTitle" placeholder="Enter topic title" />
    <Input v-model="newTopicInput.topicCode" placeholder="Enter topic code" />
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

  <Button @click="submitForm" class="submit-button mt-4">Submit</Button>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const newTopicInput = reactive({
  topicTitle: "",
  topicCode: "",
  topicDescription: "",
});

const rules = {
  topicCode: { required },
};

const emits = defineEmits(["close"]);

const v$ = useVuelidate(rules, newTopicInput);

const submitForm = async () => {
  v$.value.$validate();

  console.log(v$.value.$invalid);
  if (!v$.value.$invalid) {
    await useTopicStore().createTopic({
      code: newTopicInput.topicCode,
      title: newTopicInput.topicTitle,
      description: newTopicInput.topicDescription,
    });
    await delay(500);

    emits("close");
    // Handle form submission, e.g., send data to API
  }
};
</script>
