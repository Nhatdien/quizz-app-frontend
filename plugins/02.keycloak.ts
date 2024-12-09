import UserService from "~/stores/auth/keycloak_service";
import QuizzAppSDK from "~/stores/quizzapp_sdk";
import type { IFrame, ActivationState } from "@stomp/stompjs";

let keycloakInitialized = false;

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!keycloakInitialized) {
    keycloakInitialized = true;
    await UserService.initKeycloak(() => {
      QuizzAppSDK.getInstance().config.access_token = UserService.getToken();
      QuizzAppSDK.getInstance().config.current_username =
        UserService.getTokenParsed()?.preferred_username;
      console.log(QuizzAppSDK.getInstance().config.current_username);
    });
  }
  QuizzAppSDK.getInstance().webSocketClient = QuizzAppSDK.getInstance().config,
  

  console.log("QuizzAppSDK.getInstance().config", QuizzAppSDK.getInstance().config);

  const sdkSokcetClient = QuizzAppSDK.getInstance().webSocketClient;
  console.log("sdkSokcetClient", sdkSokcetClient);
  sdkSokcetClient.activate();
  return {
    provide: {
      keycloak: UserService,
      sdkSokcetClient,
    },
  };
});
