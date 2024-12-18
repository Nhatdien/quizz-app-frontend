<template>
  <QRCodeVue :value="qrCodeValue" :size="200" level="H" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import QRCodeVue from "qrcode.vue";

const props = defineProps({
  qrCodeValue: {
    type: String,
    required: true,
  },
});
</script>
