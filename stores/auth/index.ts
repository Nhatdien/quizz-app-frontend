import { Base } from "../base";
import KeyCloakService from "./keycloak_service";

export class Auth extends Base {
  public get isAuthenticated(): boolean | undefined {
    return KeyCloakService.instance.authenticated;
  }

  private onLoginCallback = (): void => {
    console.log("Authenticated");
    this.config.client_id = KeyCloakService.instance.clientId;
    this.config.access_token = KeyCloakService.instance.token;
  };

  public login = (): void => {
    KeyCloakService.CallLogin(this.onLoginCallback);
  };

  public logout = (): void => {
    KeyCloakService.CallLogOut();
  };
}
