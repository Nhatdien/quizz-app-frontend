<template>
  <div class="rounded-full">
    <div v-if="isLoading === true" class="text-white text-lg font-bold">
      <LoadSpinner />
    </div>
    <div
      v-if="!currentUserName && isLoading === false"
      class="text-white text-lg font-bold">
      <Button @click="() => $keycloak.doLogin()">Login</Button>
    </div>
    <DropdownMenu
      v-if="currentUserName && isLoading === false"
      :menuOptions="menuOptions">
      <template #trigger>
        <div>
          <img
            class="rounded-circle border border-[black] rounded-full"
            src="@/assets/img/default_avt.jpg"
            width="50"
            height="50" />
        </div>
      </template>

      <template #[`icon-Yourlibrary`]>
        <BookText />
      </template>

      <template #icon-Logout>
        <LogOut />
      </template>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import DropdownMenu from "~/components/Common/DropDownMenu.vue";
import LoadSpinner from "../Common/LoadSpinner.vue";
import { BookText, LogOut } from "lucide-vue-next";

const isLoading = ref();
const { $keycloak, $quizzAppSDK } = useNuxtApp();

const username = computed(() => $quizzAppSDK.config.current_username);

const currentUserName = ref($keycloak.getTokenParsed()?.preferred_username);
const menuOptions = {
  items: [
    {
      label: "Your library",
      icon: BookText,
      eventHandlers: {
        click: () => {
          navigateTo(`/quiz?search=${currentUserName.value}`);
        },
      },
    },
    {
      label: "Logout",
      icon: LogOut,
      eventHandlers: {
        click: () => {
          $keycloak?.doLogout();
        },
      },
    },
  ],
};

onMounted(async () => {
  isLoading.value = true;

  try {
    await waitForToken();
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
  currentUserName.value = $keycloak.getTokenParsed()?.preferred_username;
});
</script>
