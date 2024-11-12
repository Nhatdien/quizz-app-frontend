import { Base } from "../base";
import KeyCloakService from "./keycloak_service";

export class Auth extends Base {

  logout(): void  {
    KeyCloakService.doLogout();
  };
}
