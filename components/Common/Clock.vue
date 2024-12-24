<template>
  <ClientOnly>
    <div :style="countdownStyle" id="countdown">
      <div id="countdown-number">{{ formattedTime }}</div>

    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, onMounted, computed } from "vue";

const props = defineProps<{
  duration: number; // Total countdown duration in seconds
  remainingTime: number; // Remaining time passed from an external source
  countdownStyle?: {
    height: string;
    width: string;
    margin: string;
    marginTop: string;
    textAlign: string;
    position: string;
  };
}>();

const countdownNumber = ref<number>(props.remainingTime);
const circle = ref<SVGCircleElement | null>(null);

const updateCircleAnimation = (newRemainingTime: number) => {
  if (circle.value) {
    const radius = circle.value.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Initialize stroke properties
    circle.value.style.strokeDasharray = `${circumference}px`;

    const offset =
      ((props.duration - newRemainingTime) / props.duration) * circumference;

    // Gradually update strokeDashoffset
    circle.value.style.strokeDashoffset = `${circumference - offset}px`;
  }
};

const formattedTime = computed(() => {
  const minutes = Math.floor(countdownNumber.value / 60);
  const seconds = countdownNumber.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

onMounted(() => {
  // Ensure the initial state is rendered
  updateCircleAnimation(props.remainingTime);
});

watch(
  () => props.remainingTime,
  (newRemainingTime) => {
    countdownNumber.value = newRemainingTime;
    updateCircleAnimation(newRemainingTime);
  },
  { immediate: true }
);
</script>

<style scoped>
#countdown {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

}

#countdown-number {
  color: white;
  display: inline-block;
  font-size: 1.8rem; /* Increased font size for better readability */
  font-weight: bold; /* Make the text bold */
  position: absolute;
  text-align: center;
}

</style>
