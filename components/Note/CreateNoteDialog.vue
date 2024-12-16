<template>
  <ClientOnly />
  <Dialog v-model:open="isOpen">
    <DialogTrigger v-model="isOpen" as-child>
      <Button class="m-4">
        {{ "+ Create Note" }}
      </Button>
    </DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle> Create Note </DialogTitle>
        <DialogDescription>
          {{ "Create a new note for current question" }}
        </DialogDescription>
      </DialogHeader>
      <Form class="flex flex-col gap-8 review-item">
        <div class="review-pin"></div>
        <FormItem label="Note Title">
          <Input v-model="formData.noteTitle" placeholder="Enter note title" />
          <div class="flex flex-col" v-if="v$.noteTitle.$error">
            <span v-if="v$.noteTitle.required" class="text-red-500">{{
              v$.noteTitle.required.$message
            }}</span>
            <span v-if="v$.noteTitle.minLength" class="text-red-500">{{
              v$.noteTitle.minLength.$message
            }}</span>
          </div>
        </FormItem>
        <FormItem label="Note Content">
          <Textarea
            v-model="formData.noteContent"
            placeholder="Enter note content" />
          <div v-if="v$.noteContent.$error">
            <span v-if="v$.noteContent.required" class="text-red-500">{{
              v$.noteContent.required.$message
            }}</span>
          </div>
        </FormItem>

        <Button type="primary" @click.prevent="submitForm"
          ><bold class="text-xl">+</bold> Create Note</Button
        >
      </Form>
    </DialogContent>
  </Dialog>
  <ClientOnly />
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const props = defineProps({
  currentQuizInfo: {
    type: Object as PropType<{
        quizId: string;
        questionId: string;
    }>,
    required: true,
  },
});
const isOpen = ref(false);

const rules = {
  noteTitle: { required },
  noteContent: { required },
};
const formData = reactive({
  noteTitle: "",
  noteContent: "",
});
const v$ = useVuelidate(rules, formData);

const submitForm = () => {
  v$.value.$validate();

  if (v$.value.$invalid !== true) {
    useNoteStore().createNote([
      {
        title: formData.noteTitle,
        note: formData.noteContent,
        quizzId: props.currentQuizInfo.quizId,
        questionId: props.currentQuizInfo.questionId,
      },
    ]);
  }
};


</script>
