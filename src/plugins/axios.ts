import axios from "axios";
import keycloak from "@/plugins/keycloak";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(async (config) => {
  config.headers["Authorization"] = `Bearer ${keycloak.idToken}`;

  return config;
});
