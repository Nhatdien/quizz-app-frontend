import Keycloak from "keycloak-js";

class KeycloakService {
  private static instance: KeycloakService;
  private _kc: Keycloak;
  private static _keycloakInstance: Keycloak | null = null;
  private static _initialized: boolean = false;

  private constructor() {
    console.log("KeycloakService constructor");
    this._kc = new Keycloak({
      realm: "quizdev",
      clientId: "quizclient",
      url: "http://localhost:8180",
    });
  }

  public static getInstance(): KeycloakService {
    if (!KeycloakService.instance) {
      KeycloakService.instance = new KeycloakService();
    }
    return KeycloakService.instance;
  }

  public initKeycloak(onAuthenticatedCallback: Function): void {
    if (KeycloakService._initialized) {
      onAuthenticatedCallback();
      return;
    }

    this._kc.init({
      onLoad: 'login-required',
      redirectUri: "http://localhost:4200",
      enableLogging: true,
      scope: 'openid email',
      pkceMethod: 'S256',
    })
      .then((authenticated) => {
        if (!authenticated) {
          console.log("user is not authenticated..!");
        }
        KeycloakService._keycloakInstance = this._kc;
        KeycloakService._initialized = true;
        onAuthenticatedCallback();
      })
      .catch(console.error);
  }

  public doLogin(): void {
    this._kc.login();
  }

  public doLogout(): void {
    this._kc.logout();
  }

  public getToken(): string | undefined {
    return this._kc.token;
  }

  public getTokenParsed(): Keycloak.KeycloakTokenParsed | undefined {
    return this._kc.tokenParsed;
  }

  public isLoggedIn(): boolean {
    return !!this._kc.token;
  }

  public updateToken(successCallback: any): void {
    this._kc.updateToken(5)
      .then(successCallback)
      .catch(this.doLogin);
  }

  public getUsername(): string | undefined {
    return this._kc.tokenParsed?.preferred_username;
  }

  public hasRole(roles: any): boolean {
    return roles.some((role: any) => this._kc.hasRealmRole(role));
  }
}

const keycloakServiceInstance = KeycloakService.getInstance();
export default keycloakServiceInstance;