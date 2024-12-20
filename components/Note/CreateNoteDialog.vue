<template>
  <ClientOnly />
  <Dialog v-model:open="isOpen">
    <DialogTrigger v-model="isOpen" as-child>
      <div class="flex w-full justify-end items-center" :class="{
        'mb-4': !isEdingNote,
      }">
        <Button
          :variant="isEdingNote ? 'info' : 'default'"
          class="justify-self-end">
          <div class="flex items-start gap-4" v-if="!isEdingNote">
            <NotebookPen /><span> {{ "Create Note" }}</span>
          </div>
          <div v-else><Pencil /></div>
        </Button>
      </div>
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
          <Input
            v-model="currentNote.noteTitle"
            placeholder="Enter note title" />
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
            v-model="currentNote.noteContent"
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
import { NotebookPen, Pencil } from "lucide-vue-next";
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
import type { NoteRequest } from "~/types/note";

const props = defineProps({
  currentQuizInfo: {
    type: Object as PropType<{
      quizId: string;
      questionId: string;
    }>,
    required: true,
  },
  isEdingNote: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  note: {
    type: Object as PropType<NoteRequest>,
    required: false,
  },
});
const isOpen = ref(false);

const rules = {
  noteTitle: { required },
  noteContent: { required },
};

const editTingNote = reactive({
  noteTitle: "" as string,
  noteContent: "" as string,
});
const formData = reactive({
  noteTitle: "",
  noteContent: "",
});

const currentNote = reactive(props.isEdingNote ? editTingNote : formData);
const v$ = useVuelidate(rules, props.isEdingNote ? editTingNote : formData);

const submitForm = () => {
  v$.value.$validate();

  if (v$.value.$invalid !== true) {
    if (props.isEdingNote) {
      useNoteStore().updateNote([
        {
          id: props.note?.id,
          title: editTingNote.noteTitle,
          note: editTingNote.noteContent,
          quizzId: props.currentQuizInfo.quizId,
          questionId: props.currentQuizInfo.questionId,
        },
      ]);
    } else {
      useNoteStore().createNote([
        {
          title: formData.noteTitle,
          note: formData.noteContent,
          quizzId: props.currentQuizInfo.quizId,
          questionId: props.currentQuizInfo.questionId,
        },
      ]);

      // formData.noteTitle = "";
      // formData.noteContent = "";
    }
    isOpen.value = false;
  }
};

onMounted(() => {
  if (props.note?.title && props.note?.note) {
    editTingNote.noteTitle = props.note.title;
    editTingNote.noteContent = props.note.note;
  }
});

onUnmounted(() => {
  isOpen.value = false;
  editTingNote.noteTitle = "";
  editTingNote.noteContent = "";
  formData.noteTitle = "";
  formData.noteContent = "";
});
</script>
