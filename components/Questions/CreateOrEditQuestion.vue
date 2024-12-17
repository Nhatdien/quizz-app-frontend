<template>
  <div class="quiz-editor-container">
    <!-- Question input -->
    <!-- {{
      {
        content: questionText,
        questionType: 1,
        answers: answers,
        time: questionTimer,
        point: questionScore,
      }
    }} -->
    <div class="question-section flex flex-col w-full">
      <div class="flex justify-between w-full">
        <CommonMySelect
          v-model="questionScore"
          :options="[
            {
              label: '10 point',
              value: 10,
            },
          ]" />
        <CommonMySelect
          v-model="questionTimer"
          :options="[
            {
              label: '30 seconds',
              value: 30,
            },
          ]" />
      </div>
      <input
        class="question-editor w-full mt-4"
        @focus="setActiveEditor('question')"
        v-model="questionText"
        :placeholder="placeholderText" />
      <div class="question-icons absolute right-0 top-1">
        <!-- <Button variant="secondary" icon="image">dsadsad </Button>
        <Button variant="secondary" icon="mic">dsada </Button>
        <Button variant="secondary" icon="video"> dsad</Button> -->
      </div>
    </div>

    <!-- Answer options -->
    <div class="options-section">
      <div
        v-for="(option, index) in answers"
        :key="index"
        :style="{ backgroundColor: optionColors[index % optionColors.length] }"
        class="option-card">
        <input
          class="option-editor"
          @focus="setActiveEditor(index)"
          v-model="option.content"
          :placeholder="placeholderText" />
        <div class="option-icons">
          <Button
            variant="destructive"
            icon="trash"
            v-if="answers.length > 3"
            @click="deleteOption(index)">
          </Button>
          <Button variant="secondary" icon="image"> </Button>
          <Checkbox
            v-model:checked="option.isCorrect"
            :true-value="true"
            :false-value="false"
            class="correct-checkbox" />
        </div>
      </div>
      <Button
        v-if="answers.length < 5"
        @click="addOption"
        variant="primary"
        class="add-option-button"
        >+</Button
      >
    </div>
    <!-- Answer type toggle buttons -->
    <div class="answer-type-toggle">
      <Button
        :variant="isMultipleCorrect ? 'primary' : 'secondary'"
        @click="toggleSingleCorrect"
        >Single correct answer</Button
      >
      <Button
        :variant="!isMultipleCorrect ? 'primary' : 'secondary'"
        @click="toggleMultipleCorrect"
        >Multiple correct answers</Button
      >
    </div>
  </div>
  <Button @click="handleSaveQuestion">Save Question</Button>
</template>

<script setup>
import CommonQuill from "~/components/Common/Quill.vue";

const route = useRoute();
const props = defineProps({
  question: {
    type: Object,
    required: false,
  },
});

const isEditingQuestion = ref(!!props?.question?.id);

const currentQuiz = computed(() => {
  return useQuizStore().quiz.find((quiz) => quiz.id === route.params.quiz_id);
});

const submitPayload = computed(() => {
  const payload = { ...currentQuiz.value };
  const currentEditingQuestion = {
    content: questionText.value,
    questionType: 1,
    answers: answers,
    time: questionTimer.value,
    point: questionScore.value,
  };

  if (isEditingQuestion.value) {
    const questionIndex = payload.questions.findIndex(
      (question) => question.id === props.question.id
    );
    payload.questions[questionIndex] = {
      id: props.question.id,
      ...currentEditingQuestion,
    };
  } else {
    payload.questions = [...payload.questions, currentEditingQuestion];
  }

  return payload;
});

const handleSaveQuestion = async () => {
  // console.log(submitPayload.value);
  await useQuizStore().updateQuiz(submitPayload.value);
};

watch(props.question, (newVal) => {
  if (newVal) {
    questionText.value = newVal.content;

    answers.forEach((option, index) => {
      option.content = newVal.options[index].content;
      option.isCorrect = newVal.options[index].isCorrect;
    });

    isMultipleCorrect.value = newVal.isMultipleCorrect;
  }
});

const questionText = ref("");
const answers = reactive([
  { content: "", isCorrect: false },
  { content: "", isCorrect: false },
  { content: "", isCorrect: false },
  { content: "", isCorrect: false },
]);
const questionTimer = ref(30);
const questionScore = ref(10);

const activeEditor = ref(null); // Tracks the currently active editor (question or option index)
const activeContent = ref(""); // Content bound to the shared toolbar
const placeholderText = "Type here...";

const toolbarOptions = {
  theme: "snow",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
};

const optionColors = ["#005a99", "#008080", "#ffa500", "#d9534f"]; // Colors for option backgrounds
const isMultipleCorrect = ref(false);

// Function to set the active editor and link it to the toolbar content
function setActiveEditor(editorType) {
  activeEditor.value = editorType;

  // Set the active content to the clicked field's content
  if (editorType === "question") {
    activeContent.value = questionText.value;
  } else if (typeof editorType === "number") {
    activeContent.value = answers[editorType].content;
  }
}

// Watcher to update the correct field whenever activeContent changes
watch(activeContent, (newValue) => {
  if (activeEditor.value === "question") {
    questionText.value = newValue;
  } else if (typeof activeEditor.value === "number") {
    answers[activeEditor.value].content = newValue;
  }
});

onMounted(() => {
  if (props.question) {
    questionText.value = props.question.content;
    props.question.answers.forEach((option, index) => {
      answers[index].content = option.content;
      answers[index].isCorrect = option.isCorrect;
    });
  }
});

const resetCorrectOptions = () => {
  answers.forEach((option) => (option.isCorrect = false));
  console.log("reset", answers);
};

watch(
  () => isMultipleCorrect.value,
  async (newValue) => {
    if (!newValue) {
      await nextTick();
      resetCorrectOptions();
    }
  },
  { deep: true }
);

// Function to add a new option field
function addOption() {
  answers.push({ content: "", isCorrect: false });
}

// Function to delete an option
function deleteOption(index) {
  answers.splice(index, 1);
}

// Toggle between single and multiple correct answers
function toggleSingleCorrect() {
  isMultipleCorrect.value = false;
  answers.forEach((option) => (option.isCorrect = false)); // Reset other options if switching to single correct
}

function toggleMultipleCorrect() {
  isMultipleCorrect.value = true;
}
</script>

<style scoped lang="scss">
.quiz-editor-container {
  padding: 20px;
  width: 100%;
  background-color: #3a0a4d;
  color: #fff;
  border-radius: 8px;
  margin: auto;
}

.question-section {
  display: flex;
  align-items: flex-start;
  position: relative;
  text-align: center;
  gap: 10px;
  margin-bottom: 20px;
}

.question-editor {
  * {
    color: #fff !important;
  }
  flex-grow: 1;
  padding: 20px;
  text-align: center;
  min-height: 15rem;
  height: auto;
  background-color: #250c3d;
  border-radius: 8px;
  cursor: pointer;
}

.question-icons button {
  background-color: transparent;
  color: #bbb;

  margin-right: 5px;
}

.options-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.option-card {
  padding: 20px;
  flex-grow: 1;
  width: 100%;
  text-align: center;

  min-height: 100px;
  border-radius: 8px;
  color: #fff;
  position: relative;
}

.option-editor {
  min-height: 60px;
  background-color: transparent;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.option-icons {
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
}

.correct-checkbox {
  margin-left: auto;
}

.add-option-button {
  background-color: #6200ea;
  color: #fff;
  border-radius: 50%;
  font-size: 24px;
  padding: 0 12px;
}

.answer-type-toggle {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.answer-type-toggle button {
  font-weight: bold;
}
</style>
