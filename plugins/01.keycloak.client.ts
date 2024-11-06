import UserService from "~/stores/auth/keycloak_service";


export default defineNuxtPlugin((nuxtApp) => {
    UserService.initKeycloak(() => {});
});