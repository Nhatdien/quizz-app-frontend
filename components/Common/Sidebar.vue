<template>
  <div class="w-[200px]">
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h3 @click="navigateTo('/')" class="cursor-pointer">Quizz App</h3>
        </SidebarHeader>
        <SidebarContent>
          <QuizCreateQuizDialog />
          <SidebarMenu>
            <SidebarMenuButton
              :class="{ active: isActive('/quiz'), hover: true }"
              @click="navigateTo('quiz')">
              Your Quizzes
            </SidebarMenuButton>
            <SidebarMenuButton
              :class="{ active: isActive('/admin/dashboard'), hover: true }"
              to="/admin/dashboard"
              icon="home">
              Explore
            </SidebarMenuButton>
            <SidebarMenuButton
              :class="{ hover: true }"
              @click="() => $keycloak.doLogout()">
              Logout
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuButton
              :class="{ active: isActive('/admin/settings'), hover: true }"
              to="/admin/settings"
              icon="settings">
              Settings
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  </div>
</template>

<script lang="ts" setup>
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarSchema } from "./sidebarSchema";
import { useQuizStore } from "~/stores/stores/quiz";
import { useRoute } from "vue-router";
const { $keycloak } = useNuxtApp();

const quizStore = useQuizStore();
const route = useRoute();

const handleClickCreateQuiz = async () => {
  const quiz = await quizStore.createTestQuiz({
    title: "Test Quiz",
    topicCode: "defaultTopic",
    description: "This is a test quiz",
    questions: [],
  });

  console.log(quizStore.quiz);

  navigateTo(`/quiz/${quiz.id}/view`);
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<style scoped>
.active {
  background-color: #f0f0f0; /* Change to your desired active background color */
  font-weight: bold;
}

.hover:hover {
  background-color: #e0e0e0; /* Change to your desired hover background color */
}
</style>
