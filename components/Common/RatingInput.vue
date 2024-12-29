<template>
  <div class="review-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star cursor-pọinter"
      :class="{
        filled: star <= (hoverValue || modelValue),
        'half-filled':
          star === Math.ceil(hoverValue || modelValue) &&
          (hoverValue || modelValue) % 1 !== 0,
      }"
      @click="setRating(star)"
      @mouseover="setHover(star)"
      @mouseleave="clearHover">
      ★
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const hoverValue = ref<number | null>(5);

function setRating(star: number) {
  emit("update:modelValue", star);
}

function setHover(star: number) {
  hoverValue.value = star;
}

function clearHover() {
  hoverValue.value = null;
}
</script>

<style scoped lang="css">
.rating-input {
  display: flex;
  gap: 5px;
  cursor: pointer;
}
</style>
