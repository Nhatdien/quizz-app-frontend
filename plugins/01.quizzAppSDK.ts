import QuizzAppSDK from "@/stores/quizzapp_sdk";

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config;
  const quizzAppSDK = QuizzAppSDK.getInstance({
    base_url: config.public.baseURL,
    websocket_url: config.public.websocketURL,
    client_id: config.public.clientId,
    access_token: "",
    current_username: "",
  });


  return {
    provide:{
      quizzAppSDK,
    }
  }
});
