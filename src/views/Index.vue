<template>
  <div>
    <v-app-bar color="primary">
      <v-app-bar-title>ApplicaSet Console</v-app-bar-title>
      <v-toolbar-items>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn :rounded="false" v-bind="props">
              <v-avatar :image="avatar" class="me-2" />
              {{ userTitle }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item prepend-icon="mdi-logout" title="Sign Out" @click="signOut" />
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>
<script setup lang="ts">
import keycloak from "@/auth/keycloak";
import gravatar from "gravatar";
import { ref } from "vue";

const avatar = ref('')
const userTitle = ref('')

keycloak.loadUserProfile().then(()=>{
  userTitle.value = `${keycloak.profile?.firstName} ${keycloak.profile?.lastName}`
  if (keycloak.profile?.email)
    avatar.value = gravatar.url(keycloak.profile?.email, {s:"40"}, true)
})

function signOut() {
  keycloak.logout()
}
</script>
