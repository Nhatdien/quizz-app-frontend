import Keycloak from "keycloak-js";

class KeycloakService {
  private static instance: KeycloakService;
  private static _kc: Keycloak.KeycloakInstance;
  private static _initialized: boolean = false;
  private static _initPromise: Promise<void> | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): KeycloakService {
    if (!KeycloakService.instance) {
      KeycloakService.instance = new KeycloakService();
      KeycloakService._kc = new Keycloak({
        realm: "quizdev",
        clientId: "quizclient",
        url: "http://localhost:8180",
      });
    }
    return KeycloakService.instance;
  }

  public initKeycloak(onAuthenticatedCallback: Function): void {
    console.log("KeycloakService.initKeycloak() called", KeycloakService._initialized);
    if (KeycloakService._initialized) {
      onAuthenticatedCallback();
      return;
    }

    if (!KeycloakService._initPromise) {
      KeycloakService._initPromise = KeycloakService._kc.init({
        onLoad: 'login-required',
        redirectUri: "http://localhost:4200",
        enableLogging: true,
        scope: 'openid email',
        pkceMethod: 'S256',
      })
        .then((authenticated) => {
          if (!authenticated) {
            console.log("User is not authenticated!");
          }
          KeycloakService._initialized = true;
          onAuthenticatedCallback();
        })
        .catch((error) => {
          console.error(error);
          KeycloakService._initPromise = null; // Reset the promise if initialization fails
        });
    } else {
      KeycloakService._initPromise.then(() => {
        onAuthenticatedCallback();
      });
    }
  }

  public doLogin(): void {
    KeycloakService._kc.login();
  }

  public doLogout(): void {
    KeycloakService._kc.logout();
  }

  public getToken(): string | undefined {
    return KeycloakService._kc.token;
  }

  public getTokenParsed(): Keycloak.KeycloakTokenParsed | undefined {
    return KeycloakService._kc.tokenParsed;
  }

  public isLoggedIn(): boolean {
    return !!KeycloakService._kc.token;
  }

  public updateToken(successCallback: any): void {
    KeycloakService._kc.updateToken(5)
      .then(successCallback)
      .catch(this.doLogin);
  }

  public getUsername(): string | undefined {
    return KeycloakService._kc.tokenParsed?.preferred_username;
  }

  public hasRole(roles: any): boolean {
    return roles.some((role: any) => KeycloakService._kc.hasRealmRole(role));
  }
}

const keycloakServiceInstance = KeycloakService.getInstance();
export default keycloakServiceInstance;