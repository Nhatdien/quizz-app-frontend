import UserService from "~/stores/auth/keycloak_service";
import QuizzAppSDK from "~/stores/quizzapp_sdk";
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { h, render } from "vue";
import { User } from "lucide-vue-next";

let keycloakInitialized = false;

export default defineNuxtPlugin(async (nuxtApp) => {
  const { toast } = useToast();
  const config = nuxtApp.$config;
  const quizzAppSDK = QuizzAppSDK.getInstance({
    base_url: config.public.baseURL,
    base_frontend_url: config.public.baseFrontendURL,
    websocket_url: config.public.websocketURL,
    client_id: config.public.clientId,
    access_token: "",
    current_username: "",
  });

  if (import.meta.client) {
    if (!keycloakInitialized) {
      keycloakInitialized = true;

      // Initialize Keycloak and ensure it's ready
      await UserService.initKeycloak(() => {
        // Once Keycloak is initialized, update the SDK with the token and username
        const token = UserService.getToken();
        const username = UserService.getTokenParsed()?.preferred_username;

        // Update QuizzAppSDK configuration with Keycloak details
        QuizzAppSDK.getInstance().config.access_token = token;
        QuizzAppSDK.getInstance().config.current_username = username;
        QuizzAppSDK.getInstance().webSocketClient =
          QuizzAppSDK.getInstance().config;

        console.log(QuizzAppSDK.getInstance().webSocketClient);

        // Activate the WebSocket client after initialization
        QuizzAppSDK.getInstance().webSocketClient.activate();
      });
    }
  }

  return {
    provide: {
      keycloak: UserService,
      sdkSokcetClient: QuizzAppSDK.getInstance().webSocketClient,
      quizzAppSDK,
    },
  };
});
