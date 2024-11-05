import Keycloak from 'keycloak-js'

const keycloakInstance = new Keycloak({
    url: 'http://localhost:8180/realms/quizdev/protocol/openid-connect/auth',
    realm: 'quizzdev',
    clientId: 'quizclient'
})

interface CallbackOneParam<T1 = void, T2 = void> {
  (param1: T1): T2
}

interface authenthicatedCallback {
  (): void
}
/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const Login = (onAuthenticatedCallback: authenthicatedCallback) => {
  keycloakInstance
    .init({ onLoad: 'login-required' })
    .then(function (authenticated) {
      authenticated ? onAuthenticatedCallback() : alert('non authenticated')
    })
    .catch((e) => {
      console.error(e)
      console.log(`keycloak init exception: ${e}`)
    })
}

const LogOut = () => {
  keycloakInstance.logout()
}

const KeyCloakService = {
  CallLogin: Login,
  CallLogOut: LogOut,
  instance: keycloakInstance
}

export default KeyCloakService