import QuizzAppSDK from "@/stores/quizzapp_sdk";
import type { IFrame, ActivationState } from "@stomp/stompjs";

export default defineNuxtPlugin((nuxtApp) => {
  const config = nuxtApp.$config;
  const quizzAppSDK = QuizzAppSDK.getInstance({
    base_url: config.public.baseURL,
    websocket_url: config.public.websocketURL,
    client_id: config.public.clientId,
  });

  const sdkSokcetClient = quizzAppSDK.webSocketClient;

  sdkSokcetClient.onConnect = (frame: IFrame) => {
    console.log("Connected to websocket", frame);
  }

  sdkSokcetClient.onStompError = (frame: IFrame) => {
    console.error("Error", frame);
  }

  sdkSokcetClient.onChangeState = (state: ActivationState) => {
    console.log("State", state);
  }

  sdkSokcetClient.activate();

  return {
    provide:{
      quizzAppSDK,
      sdkSokcetClient
    }
  }
});
