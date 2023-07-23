<template>
  <div class="bg-body-tertiary min-vh-100">
    <template v-if="initialized">
      <nav class="navbar navbar-expand border-bottom">
        <div class="container">
          <router-link :to="{ name: 'Index' }" class="navbar-brand">
            <img
              src="@/assets/logo.png"
              alt="ApplicaSet"
              width="32"
              height="32"
            />
            ApplicaSet
          </router-link>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img :src="userAvatar" alt="" width="32" height="32" />
                {{ userName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="signOut">
                    Sign Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <router-view />
      <footer class="pt-4 pb-2 text-center">&copy; 2023 ApplicaSet Team</footer>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import keycloak from "@/plugins/keycloak";
import { KeycloakProfile } from "keycloak-js";
import gravatar from "gravatar";

type Data = {
  initialized: boolean;
  userProfile?: KeycloakProfile;
};

export default defineComponent({
  data(): Data {
    return {
      initialized: false,
      userProfile: undefined,
    };
  },
  computed: {
    userAvatar(): string {
      return gravatar.url(this.userProfile?.email || "");
    },
    userName(): string {
      return this.userProfile
        ? `${this.userProfile.firstName} ${this.userProfile.lastName}`
        : "";
    },
  },
  async beforeMount() {
    await keycloak.init({
      onLoad: "login-required",
    });

    this.userProfile = await keycloak.loadUserProfile();

    this.initialized = true;
  },
  methods: {
    signOut() {
      keycloak.logout();
    },
  },
});
</script>
