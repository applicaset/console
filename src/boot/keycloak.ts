import { boot } from 'quasar/wrappers';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';
import { api } from 'boot/axios';

export default boot(async ({ app }) => {
  async function tokenInterceptor() {
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${app.config.globalProperties.$keycloak.idToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return new Promise((resolve) => {
    app.use(VueKeyCloak, {
      init: {
        onLoad: 'login-required',
      },
      config: {
        url: 'https://auth.applicaset.com/',
        realm: 'applicaset',
        clientId: 'applicaset',
      },
      onReady: () => {
        tokenInterceptor();
        resolve();
      },
    });
  });
});

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}
