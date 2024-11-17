import UserService from "~/stores/auth/keycloak_service";
import QuizzAppSDK from "~/stores/quizzapp_sdk";

export default defineNuxtPlugin((nuxtApp) => {
  UserService.initKeycloak(() => {
    QuizzAppSDK.getInstance().config.access_token = UserService.getToken();
    console.log("Keycloak initialized", QuizzAppSDK.getInstance().config.access_token);
  });

  return {
    provide: {
      keycloak: UserService,
    },
  };
});
