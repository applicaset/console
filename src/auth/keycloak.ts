import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak({
  clientId: "applicaset",
  realm: "applicaset",
  url: "https://auth.applicaset.com"
});

export default keycloakInstance;
