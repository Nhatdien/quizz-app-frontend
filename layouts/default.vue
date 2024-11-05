<template>
  <div class="main-content">

  <slot />
  </div>
  <div class="w-[200px]">
  <SidebarProvider>
    <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar>
        <SidebarHeader>
          <span class="text-lg font-bold">Quizz App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuButton to="/admin/dashboard" icon="home">
              Dashboard
            </SidebarMenuButton>
            <SidebarMenuButton to="/admin/quizzes" icon="book">
              Quizzes
            </SidebarMenuButton>
            <SidebarMenuButton to="/admin/questions" icon="question">
              Questions
            </SidebarMenuButton>
            <SidebarMenuButton to="/admin/users" icon="user">
              Users
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
    </div>
  </SidebarProvider>
</div>
</template>

<script setup lang="ts"></script>
