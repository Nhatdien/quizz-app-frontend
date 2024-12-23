<template>
  <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
    <span
      class="text-xl sm:text-xxl md:text-3xl font-bold flex items-center gap-4">
      <div>
        <img
          class="rounded-circle border-2 border-[black] rounded-full w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
          src="@/assets/img/default_avt.jpg" />
      </div>
      <span class="font-extrabold sm:text-3xl lg:text-4xl">{{
        route.query.search
      }}</span>
    </span>

    <Button
      v-if="isMe"
      :variant="'destructive'"
      class="md:text-2xl flex gap-2 p-6"
      @click="() => $keycloak.doLogout()">
      <LogOut :size="32" :stroke-width="3"/>
      <span> Log out </span>
    </Button>
  </div>

  <Separator class="my-8" />

  <h2 class="font-extrabold">User library</h2>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
    <QuizCreateQuizDialog v-if="isMe">
      <template #trigger>
        <div class="h-full">
          <Card class="h-full">
            <CardContent class="h-full">
              <div
                class="create-btn-container flex h-full items-center p-8 justify-center gap-4">
                <div class="create-quiz flex items-center justify-center gap-4">
                  <span class="sm:text-2xl md:text-3xl font-extrabold"
                    >Create new</span
                  >
                  <PlusCircle class="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </template>
    </QuizCreateQuizDialog>
    <div v-for="quiz in quizzes" :key="quiz.id" class="w-full h-auto">
      <QuizCard
        :enable-delete="isMe"
        class="w-full h-auto"
        :quiz="quiz"
        >
      </QuizCard>
    </div>
    <div class="w-full h-auto"></div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircle, LogOut } from "lucide-vue-next";

const { $keycloak } = useNuxtApp();

const isMe = ref(false);
const route = useRoute();
const loading = ref(true);
const quizzes = computed(() => {
  return useQuizStore().quiz;
});

onMounted(async () => {
  try {
    // if (!useQuizStore().quiz.length) {
    await waitForToken();
    useQuizStore().searchQuiz({
      textSearch: route.query.search as string,
    });
    isMe.value = $keycloak.getUsername() === route.query.search;
    // }
  } catch (error) {
    console.error("Error fetching quizzes:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.create-btn-container {
  background-image: url("../../assets/img/create-quiz-bg.jpg");
}
.create-quiz {
  background-color: #d9f99d;
  color: #000;
  font-weight: bold;
  padding: 0.5rem 2rem;
  border-radius: 9999px;
  border: 3px solid #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), inset 0 -4px #b2df8a;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    background-color: #bef264;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #a3e635;
    transform: translateY(2px);
  }
}
</style>
