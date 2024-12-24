<template>
  <div class="countdown">
    <transition name="fade" mode="out-in">
      <span :key="timeLeft">{{ Math.ceil(timeLeft / 1000) }}</span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  time: {
    type: Number,
    required: true,
  },
});
const timeLeft = ref(props.time);

const startCountdown = () => {
  const countdownInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1000;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});
</script>

<style scoped>
.countdown {
  font-size: 2em;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
