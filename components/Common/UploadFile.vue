<template>
  <div class="flex flex-col">
    <!-- Upload Area -->
    <Button
      @click.prevent="clearFile"
      class="clear-button self-end"
      :disabled="file === null"
      >Remove file</Button
    >
    <div
      class="upload-area"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      @click="triggerFileInput"
      :class="{ dragging: isDragging }">
      <input
        ref="fileInput"
        type="file"
        class="file-input"
        @change="onFileChange"
        :accept="accept" />
      <div v-if="file" class="preview-area">
        <!-- Image Preview -->
        <img
          v-if="isImage"
          :src="previewSrc"
          alt="Preview"
          class="preview-image" />

        <!-- File Name Display -->
        <div v-else class="file-info">
          <span class="file-name">{{ file.name }}</span>
        </div>

        <!-- Remove File Button -->
      </div>
      <div v-else class="upload-message">
        <i class="upload-icon"><Upload /></i>
        <span>Click to upload or drag a file here</span>
      </div>
    </div>

    <!-- Preview or File Details -->
    <Button v-if="showUpload" @click="handleClickUploadFile">
      Upload Excel file</Button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Upload } from "lucide-vue-next";
import { useToast } from "../ui/toast/use-toast";

const props = defineProps({
  accept: {
    type: String,
    default: "image/*",
  },

  showUpload: {
    type: Boolean,
    default: false,
  },

  uploadPath: {
    type: String,
    default: "",
    required: false,
  },
});

const { $quizzAppSDK } = useNuxtApp();
// File Types
type FileType = File | null;

const emits = defineEmits({
  onFileUploaded: () => {},
})

// Refs for state
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const previewSrc = ref<string | undefined>(undefined);
const file = defineModel<FileType>();
const isImage = ref<boolean>(false);

// Function to upload file

// Drag-and-drop functionality
function onDragOver(event: DragEvent): void {
  isDragging.value = true;
}

function onDragLeave(): void {
  isDragging.value = false;
}

function onDrop(event: DragEvent): void {
  event.preventDefault();
  isDragging.value = false;

  const files = event.dataTransfer?.files;
  if (files) handleFiles(files);
}

// Handle file input change
function onFileChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) handleFiles(files);
}

const acceptValidationMap = {
  "image/*": "image/",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

// Process file selection and validate file types
function handleFiles(files: FileList): void {
  if (files.length > 0) {
    const selectedFile = files[0];
    const acceptExtensions = props.accept.split(",") as Array<
      keyof typeof acceptValidationMap
    >;
    const validExtensions = acceptExtensions.map(
      (ext) => acceptValidationMap[ext]
    );

    if (validExtensions.some((ext) => selectedFile.type.startsWith(ext))) {
      file.value = selectedFile;
      isImage.value = selectedFile.type.startsWith("image/");

      if (isImage.value) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          previewSrc.value = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
      } else {
        previewSrc.value = undefined;
      }
    } else {
      alert(
        "Unsupported file type. Please upload an image, PDF, or XLSX file."
      );
      clearFile();
    }
  }
}

const handleClickUploadFile = async () => {
  if (file.value) {
    try {
      const response = (await $quizzAppSDK.uploadFile(
        file.value,
        props.uploadPath
      )) as Response;

      const quizUpload = await response.json()

      navigateTo(`/quiz/${quizUpload?.id}/view`)
      emits("onFileUploaded")
      if (response.status >= 400) {
        useToast().toast({
          title: "Error",
          description: await response.text(),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// Clear file and preview
function clearFile(): void {
  previewSrc.value = undefined;
  file.value = null;
  isImage.value = false;
  if (fileInput.value) fileInput.value.value = "";
}

// Trigger file input programmatically
function triggerFileInput(): void {
  fileInput.value?.click();
}
</script>

<style scoped>
/* Upload Area Styles */
.upload-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 2px dashed #d3d3d3;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-area.dragging {
  background-color: #e6e6e6;
}

.file-input {
  display: none;
}

.upload-message {
  display: flex;
  gap: 0.5rem;

  text-align: center;
  color: #ff4d4d;
  font-size: 16px;
  font-weight: bold;
}

.upload-icon {
  font-size: 24px;
  margin-bottom: 8px;
  display: block;
}

/* Preview Area Styles */
.preview-area {
  text-align: center;
  position: relative;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
}

.file-info {
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.file-name {
  display: block;
  margin-bottom: 4px;
}

.file-type {
  font-size: 14px;
  color: #888;
}

.clear-button {
  margin-bottom: 8px;
  padding: 8px 16px;
  width: fit-content;
}

.clear-button:hover {
  background-color: #e60000;
}

/* Submit Area Styles */
.submit-area {
  margin-top: 16px;
  text-align: center;
}
</style>
