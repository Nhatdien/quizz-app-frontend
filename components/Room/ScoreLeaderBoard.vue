<template>
  <div class="leaderboard">
    <h2>Score Leaderboard</h2>
    <ul>
      <li v-for="(score, username) in scores" :key="username">
        <div class="user-info">
          <span class="username">{{ username }}</span>
          <span class="score">{{ score }}</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: getProgressWidth(score) + '%' }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  scores: {
    type: Object,
    required: true,
  },
});

const { scores } = toRefs(props);

const maxScore = computed(() => Math.max(...Object.values(scores.value)));

const getProgressWidth = (score: number) => {
  return (score / maxScore.value) * 100;
};

</script>

<style scoped>
.leaderboard {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
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
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.username {
  font-weight: bold;
  color: #555;
}

.score {
  color: #888;
}

</style>
