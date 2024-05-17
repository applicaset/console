<script setup lang="ts">
import keycloak from "@/auth/keycloak";
import { inject, ref } from "vue";
import { useNotificationsStore } from "@/store/notifications";

const axios: any = inject("axios");

const notificationStore = useNotificationsStore();

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
    <v-snackbar-queue v-model="notificationStore.messages">
      <template v-slot:actions="{ props }">
        <v-btn icon="mdi-close" size="small" v-bind="props" />
      </template>
    </v-snackbar-queue>
    <router-view v-if="!initializing" />
  </v-app>
</template>
