import Keycloak from "keycloak-js";

export default new Keycloak({
  url: "https://auth.applicaset.com/",
  realm: "applicaset",
  clientId: "applicaset",
});
