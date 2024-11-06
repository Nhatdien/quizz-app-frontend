import QuizzAppSDK from "@/stores/quizzapp_sdk";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const quizzAppSDK = QuizzAppSDK.getInstance({
    base_url: config.public.baseURL,
    client_id: config.public.clientId,
  });


  quizzAppSDK.onError = (error: unknown): void => {
  };

  nuxtApp.provide("quizzAppSDK", QuizzAppSDK);
});
