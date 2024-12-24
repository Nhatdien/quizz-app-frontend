<template>
  <ClientOnly>
    <div :style="countdownStyle" id="countdown">
      <div id="countdown-number">{{ formattedTime }}</div>
      <svg>
        <circle ref="circle" r="18" cx="20" cy="20"></circle>
      </svg>
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
#countdown-number {
  color: white;
  display: inline-block;
  line-height: 40px;
  font-size: 1.2rem;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: white;
  fill: none;
  /* The transition ensures a smooth animation for stroke-dashoffset */
  transition: stroke-dashoffset 1s linear;
}
</style>
