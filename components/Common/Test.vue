<template>
  <CommonQuill v-model="activeContent" :options="toolbarOptions" />
  <div class="quiz-editor-container">
    <!-- Fixed toolbar for the editor -->

    <!-- Question input -->
    <div class="question-section">
      <div class="question-editor" @click="setActiveEditor('question')" v-html="questionText || placeholderText"></div>
      <div class="question-icons absolute right-0 top-1">
        <Button variant="secondary" icon="image">dsadsad </Button>
        <Button variant="secondary" icon="mic">dsada </Button>
        <Button variant="secondary" icon="video"> dsad</Button>
      </div>
    </div>

    <!-- Answer options -->
    <div class="options-section">
      <div
        v-for="(option, index) in options"
        :key="index"
        :style="{ backgroundColor: optionColors[index % optionColors.length] }"
        class="option-card"
      >
        <div
          class="option-editor"
          @click="setActiveEditor(index)"
          v-html="option.text || placeholderText"
        ></div>
        <div class="option-icons">
          <Button variant="destructive" icon="trash" @click="deleteOption(index)"> </Button>
          <Button variant="secondary" icon="image"> </Button>
          <Checkbox v-model="option.isCorrect" class="correct-checkbox" />
        </div>
      </div>
      <Button v-if="options.length < 5" @click="addOption" variant="primary" class="add-option-button">+</Button>
    </div>

    <!-- Answer type toggle buttons -->
    <div class="answer-type-toggle">
      <Button :variant="isMultipleCorrect ? 'primary' : 'secondary'" @click="toggleSingleCorrect">Single correct answer</Button>
      <Button :variant="!isMultipleCorrect ? 'primary' : 'secondary'" @click="toggleMultipleCorrect">Multiple correct answers</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import CommonQuill from '~/components/Common/Quill.vue';

const questionText = ref('');
const options = reactive([
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
  { text: '', isCorrect: false },
]);
const activeEditor = ref(null); // Tracks the currently active editor (question or option index)
const activeContent = ref(''); // Content bound to the shared toolbar
const placeholderText = 'Type here...';

const toolbarOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  }
};

const optionColors = ['#005a99', '#008080', '#ffa500', '#d9534f']; // Colors for option backgrounds
const isMultipleCorrect = ref(false);

// Function to set the active editor and link it to the toolbar content
function setActiveEditor(editorType) {
  activeEditor.value = editorType;

  // Set the active content to the clicked field's content
  if (editorType === 'question') {
    activeContent.value = questionText.value;
  } else if (typeof editorType === 'number') {
    activeContent.value = options[editorType].text;
  }
}

// Watcher to update the correct field whenever activeContent changes
watch(activeContent, (newValue) => {
  if (activeEditor.value === 'question') {
    questionText.value = newValue;
  } else if (typeof activeEditor.value === 'number') {
    options[activeEditor.value].text = newValue;
  }
});

// Function to add a new option field
function addOption() {
  options.push({ text: '', isCorrect: false });
}

// Function to delete an option
function deleteOption(index) {
  options.splice(index, 1);
}

// Toggle between single and multiple correct answers
function toggleSingleCorrect() {
  isMultipleCorrect.value = false;
  options.forEach(option => option.isCorrect = false); // Reset other options if switching to single correct
}

function toggleMultipleCorrect() {
  isMultipleCorrect.value = true;
}
</script>

<style scoped lang="scss">
.quiz-editor-container {
  padding: 20px;
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
  flex-grow: 1;
  padding: 20px;
  background-color: #250c3d;
  border-radius: 8px;
  min-height: 100px;
  cursor: pointer;
}

.question-icons button {
  background-color: transparent;
  color: #bbb;
  
  margin-right: 5px;
}

.options-section {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.option-card {
  padding: 20px;
  flex-grow: 1;
  max-width: 300px;
  min-height: 100px;
  border-radius: 8px;
  color: #fff;
  position: relative;
}

.option-editor {
  min-height: 60px;
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
