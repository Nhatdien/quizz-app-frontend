import { defineStore } from "pinia";
import QuizzAppSDK from "../quizzapp_sdk";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    async login(): Promise<void> {
      return QuizzAppSDK.getInstance().login();
    },

    async logout(): Promise<void> {
      return QuizzAppSDK.getInstance().logout();
    },
  },
});
