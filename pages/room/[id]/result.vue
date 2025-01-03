<template>
  <div
    class="flex flex-col rounded-sm justify-center items-center p-8 bg-gray-100 relative shadow-lg">
    <div class="info-pin"></div>
    <div
      v-if="isPlayer"
      class="bg-white rounded-lg shadow-md p-10 w-full max-w-lg text-center relative">
      <div class="section-pin"></div>
      <h1 class="text-2xl md:text-3xl font-semibold mb-4">Quiz Results</h1>

      <p class="text-lg md:text-xl font-medium mb-6">{{ isPassed(currentScore) ? 'Nice job, you passed!' : 'Oh no, you failed' }}</p>

      <div class="grid grid-cols-1 gap-4 mb-6 relative">
        <div class="bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 class="text-sm md:text-base font-semibold text-gray-500">
            YOUR SCORE
          </h2>
          <p
            class="text-3xl md:text-4xl font-bold"
            :class="{
              'text-green-600': isPassed(currentScore),
              'text-red-600': !isPassed(currentScore),
            }">
            {{ currentScore }} / {{ quizMaxScore }}
          </p>
          <div class="relative">
            <progress
              class="progress-bar"
              :max="quizMaxScore"
              :value="currentScore" />
            <span class="absolute top-[-6px] left-[40%] text-red-600">|</span>
          </div>
          <p class="text-sm md:text-base text-gray-400">PASSING SCORE: 40%</p>
        </div>
      </div>
    </div>
    <div v-if="typeof isPlayer === 'boolean'" class="w-full max-w-lg">
      <div class="my-4">All Player results:</div>
      <div
        class="attempt"
        v-for="(participant, index) in participants"
        :key="participant.username"
        :class="{
          highlight: participant.username === currentUser,
          'first-place': index === 0,
          'second-place': index === 1,
          'third-place': index === 2,
        }">
        <div class="p-8 relative">
          <div
            :class="{
              'review-pin': index === 0,
              'silver-pin': index === 1,
              'brown-pin': index === 2,
            }"></div>
          <div class="flex justify-between items-center">
            <p>#{{ index + 1 }} {{ participant.username }}</p>
            <div
              :class="{
                'score-passed': isPassed(participant.score),
                'score-failed': !isPassed(participant.score),
              }">
              {{ participant.score }} / {{ quizMaxScore }}
            </div>
          </div>
          <progress
            class="progress-bar"
            v-bind:max="quizMaxScore"
            :value="participant.score" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Progress from "~/components/ui/progress/Progress.vue";
import type { Question } from "~/types/quiz";

const { $quizzAppSDK } = useNuxtApp();
const quizAttempt = computed(() => useQuizStore().quizAttempt);
const currentUser = ref($quizzAppSDK.config.current_username);

const isPlayer = ref<null | boolean>(null);
const isDialogOpen = ref();
const currentQuiz = computed(() => {
  return useQuizStore().quiz[0];
});

const countIntervalCalled = ref(0);
const participants = computed(() => {
  return useRoomStore()
    .roomParticipants.filter(
      (participant) => participant.username !== useRoomStore().room.createdBy
    )
    ?.sort((a, b) => {
      return b?.score - a?.score;
    });
});

const currentScore = computed(() => {
  return useRoomStore().roomParticipants.find(
    (participant) => participant.username === currentUser.value
  )?.score as number;
});

const progressValue = ref(0);
const quizMaxScore = computed(() => {
  return currentQuiz.value?.questions?.reduce(
    (acc, question) => acc + question.point,
    0
  );
});

const isPassed = (score: number) => {
  return (score / quizMaxScore.value) * 100 >= 40;
};

watchEffect(() => {
  progressValue.value = (currentScore.value / quizMaxScore.value) * 100;
});

const pollInterVal = ref();

watchEffect(() => {
  if (countIntervalCalled.value > 1) {
    clearInterval(pollInterVal.value);
  }
});

onMounted(async () => {
  try {
    await waitForToken();
    currentUser.value = $quizzAppSDK.config.current_username;
    useRoomStore().getParticipants(useRoute().query.code as string);

    if (!useRoomStore().room.id) {
      await useRoomStore().getRoomByCode(useRoute().query.code as string);
    }

    useQuizStore().getQuiz(useRoomStore().room.quizzId as string);
    isPlayer.value = useRoomStore().room.createdBy !== currentUser.value;
    if (isPlayer) {
      await $quizzAppSDK.joinRoom(
        useRoute().params.id as string,
        useRoute().query.code as string,
        currentUser.value as string,
        () => {}
      );
    }

    const creatorJoinRoom = useRoomStore().roomParticipants.find(
      (participant) => participant.username === useRoomStore().room.createdBy
    );

    if (creatorJoinRoom) {
      useRoomStore().leaveRoom(
        useRoomStore().room.id,
        useRoomStore().room.code,
        creatorJoinRoom.username as string
      );
    }

    pollInterVal.value = setInterval(() => {
      useRoomStore().getParticipants(useRoomStore().room.code);
      countIntervalCalled.value++;
    }, 1500);
  } catch (error) {
    console.error("An error occurred while fetching quiz data:", error);
  }
});

onUnmounted(() => {
  clearInterval(pollInterVal.value);
  if (isPlayer.value) {
    useRoomStore().leaveRoom(
      useRoomStore().room.id,
      useRoomStore().room.code,
      currentUser.value as string
    );
  }
  $quizzAppSDK.unsubscribeUserScoreTopic(useRoomStore().room.id);
  useRoomStore().reset();
});
</script>

<style scoped lang="scss">
.result-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  color: #333;
}

.attempt {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.highlight {
  border: 2px solid #007bff;
  background-color: #e7f3ff;
}

.first-place {
  border: 2px solid gold;
  background-color: #fffbea;
}

.second-place {
  border: 2px solid silver;
  background-color: #f0f0f0;
}

.third-place {
  border: 2px solid #cd7f32;
  background-color: #f5f5dc;
}

.recent-attempt {
  font-size: 1.2em;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

.score {
  font-size: 1em;
  font-weight: bold;
  position: absolute;
  right: calc(50% - 4.5rem / 2);
  bottom: 5px;

  &-passed {
    color: #28a745;
  }

  &-failed {
    color: #dc3545;
  }
}

p {
  margin: 5px 0;
}
</style>
