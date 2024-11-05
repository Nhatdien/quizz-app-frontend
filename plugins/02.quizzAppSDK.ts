import QuizzAppSDK from "@/stores/quizzapp_sdk";
import { useAuthStore } from "@/stores/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const quizzAppSDK = QuizzAppSDK.getInstance({
    base_url: config.public.baseURL,
  });

  quizzAppSDK.onError = (error: Error): void => {
    if (error.message === "Unauthorized") {
      useAuthStore().logout();
    }
  };

  nuxtApp.provide("quizzAppSDK", QuizzAppSDK);
});
