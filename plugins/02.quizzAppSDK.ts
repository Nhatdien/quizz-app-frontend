import QuizzAppSDK from "@/stores/quizzapp_sdk";

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config;
  const quizzAppSDK = QuizzAppSDK.getInstance({
    base_url: config.public.baseURL,
    client_id: config.public.clientId,
  });

  return {
    provide:{
      quizzAppSDK
    }
  }
});
