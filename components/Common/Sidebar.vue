<template>
  <div class="w-[200px]">
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <span
            @click="navigateTo('/')"
            class="text-lg font-bold cursor-pointer"
            >Quizz App</span
          >
        </SidebarHeader>
        <SidebarContent>
          <Button @click="handleClickCreateQuiz" class="m-4"> + Create</Button>
          <SidebarMenu>
            <SidebarMenuButton to="/admin/dashboard" icon="home">
              Dashboard
            </SidebarMenuButton>
            <SidebarMenuButton @click="navigateTo('quiz')">
              Quizzes
            </SidebarMenuButton>
            <SidebarMenuButton to="/admin/questions" icon="question">
              Questions
            </SidebarMenuButton>
            <SidebarMenuButton @click="() => $keycloak.doLogout()">
              Logout
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuButton to="/admin/settings" icon="settings">
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
const { $keycloak } = useNuxtApp();

const quizStore = useQuizStore();
const handleClickCreateQuiz = async () => {
  const quiz = await quizStore.createTestQuiz({
    title: "Test Quiz",
    topicCode: "defaultTopic",
    description: "This is a test quiz",
    questions: [],
  });

  console.log(quizStore.quiz);

  navigateTo(`/quiz/${quiz.id}/edit`);
};
</script>
