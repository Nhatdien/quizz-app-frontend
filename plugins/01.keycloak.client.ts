import UserService from "~/stores/auth/keycloak_service";
import QuizzAppSDK from "~/stores/quizzapp_sdk";

export default defineNuxtPlugin(async (nuxtApp) => {
  await UserService.initKeycloak(() => {
    QuizzAppSDK.getInstance().config.access_token = UserService.getToken();
    QuizzAppSDK.getInstance().config.current_username = UserService.getTokenParsed()?.preferred_username
    console.log(QuizzAppSDK.getInstance().config.current_username)
  });

  return {
    provide: {
      keycloak: UserService,
    },
  };
});
