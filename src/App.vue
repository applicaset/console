<script setup lang="ts">
import keycloak from "@/auth/keycloak";
import { inject, ref } from "vue";

const axios: any = inject("axios");
const initializing = ref(true);

keycloak.init({ onLoad: "login-required" }).then(() => {
  axios.defaults.headers["Authorization"] = `Bearer ${keycloak.idToken}`;
  initializing.value = false;
});
</script>

<template>
  <v-app>
    <v-overlay v-model="initializing" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="large" />
    </v-overlay>
    <router-view v-if="!initializing" />
  </v-app>
</template>
