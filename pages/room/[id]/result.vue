<template>
  <div>Your score is {{ useRoomStore().currentScore }}</div>
  <div v-if="leaderboard.length">
    <div v-for="(player, index) in topThree" :key="index" class="top-player">
      <div class="paper">
        {{ index + 1 }}. {{ player.username }} - {{ player.score }}
      </div>
    </div>
    <div class="other-players">
      <div v-for="(player, index) in otherPlayers" :key="index" class="player">
        {{ index + 1 }}. {{ player.username }} - {{ player.score }}
      </div>
    </div>
    <div class="your-score">
      Your Rank: {{ yourRank }} - {{ useRoomStore().currentScore }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const roomStore = useRoomStore();
const route = useRoute();
const { $quizzAppSDK } = useNuxtApp();

onMounted(async () => {
  await roomStore.getScore(route.params.id as string);
});

const leaderboard = computed(() => {
  const scores = roomStore.participantScores; // Assuming roomStore.scores contains all scores
  return scores.sort((a, b) => b.score - a.score);
});

const topThree = computed(() => leaderboard.value.slice(0, 3));
const otherPlayers = computed(() => leaderboard.value.slice(3));
const yourRank = computed(() => {
  const yourScore = roomStore.participantScores.find(
    (player) => player.username === $quizzAppSDK.config.current_username
  )?.score;
  return (
    leaderboard.value.findIndex((player) => player.score === yourScore) + 1
  );
});
</script>

<style scoped>
.top-player {
  margin-bottom: 10px;
}
.paper {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
.other-players {
  margin-top: 20px;
}
.player {
  margin-bottom: 5px;
}
.your-score {
  margin-top: 20px;
  font-weight: bold;
}
</style>
