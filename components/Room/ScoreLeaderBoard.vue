<template>
  <div class="leaderboard">
    <h2>Score Leaderboard</h2>
    <transition-group name="list" tag="ul">
      <li
        class="review-item"
        v-for="(score, index) in topScores"
        :key="index"
        :class="{ 'your-score': score.username === 'your-username' }">
        <div class="review-pin"></div>
        <div class="user-info">
          <div>
            <span class="rank">#{{ index + 1 }}.</span>
            <span class="username">{{ score.username }}</span>
          </div>
          <span class="score">{{ score.score }}</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: getProgressWidth(score.score) + '%' }"></div>
        </div>
      </li>
      <li v-if="yourScore" class="review-item your-score">
        <div class="review-pin"></div>
        <div class="user-info">
          <div>
            <span class="rank">Your Score:</span>
            <span class="username">{{ yourScore.username }}</span>
          </div>
          <span class="score">{{ yourScore.score }}</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: getProgressWidth(yourScore.score) + '%' }"></div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { PropType } from "vue";

const { $quizzAppSDK } = useNuxtApp();
const props = defineProps({
  scores: {
    type: Object as PropType<Record<string, number>>,
    required: true,
  },
});

const { scores } = toRefs(props);

const maxScore = computed(() => Math.max(...Object.values(scores.value)));

const getProgressWidth = (score: number) => {
  return (score / maxScore.value) * 100;
};

const sortedScores = computed(() => {
  return Object.entries(scores.value)
    .sort(([, a], [, b]) => b - a)
    .map(([username, score]) => ({ username, score }));
});

const topScores = computed(() => sortedScores.value.slice(0, 10));

const yourScore = computed(() => {
  const username = $quizzAppSDK.config.current_username as string; // Replace with the actual username
  const score = scores.value?.[username];
  return score !== undefined ? { username, score } : null;
});
</script>

<style scoped>
.leaderboard {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #eeeded;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  transition: transform 0.5s;
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.rank {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}

.username {
  font-weight: bold;
  color: #555;
}

.score {
  color: #888;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter,
.list-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.your-score {
  background-color: #d4edda;
  border: 2px solid #28a745;
  margin-top: 20px;
}
</style>
