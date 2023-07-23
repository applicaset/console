import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://auth.applicaset.com/",
  realm: "applicaset",
  clientId: "applicaset",
});

export default keycloak;
