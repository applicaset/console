<script setup lang="ts">
import keycloak from "@/auth/keycloak";
import gravatar from "gravatar";
import { ref } from "vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import logo from "@/assets/images/logo.svg?url";

const avatar = ref("");
const userTitle = ref("");

keycloak.loadUserProfile().then(() => {
  userTitle.value = `${keycloak.profile?.firstName} ${keycloak.profile?.lastName}`;
  if (keycloak.profile?.email)
    avatar.value = gravatar.url(keycloak.profile?.email, { s: "96" }, true);
});

function signOut() {
  keycloak.logout();
}
</script>

<template>
  <v-app-bar scroll-behavior="hide">
    <template v-slot:prepend>
      <v-img :src="logo" :width="48" :height="48" alt="Logo" />
    </template>
    <v-app-bar-title>{{ $t("app.title") }}</v-app-bar-title>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn :icon="true" v-bind="props">
            <v-avatar size="large" :image="avatar" />
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            {{ userTitle }}
          </v-card-title>
          <v-list nav>
            <v-list-item @click="signOut">
              <v-list-item-title> Sign Out </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
  <v-main>
    <breadcrumbs />
    <router-view />
  </v-main>
  <v-footer app height="76">
    <v-row justify="center" no-gutters>
      Copyright &copy; {{ new Date().getFullYear() }} ApplicaSet
    </v-row>
  </v-footer>
</template>
