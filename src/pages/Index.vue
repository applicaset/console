<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-img src="../assets/logo.png" style="width: 32px; height: 32px" />
        <q-toolbar-title> {{ $t('applicaSet') }} </q-toolbar-title>
        <q-btn stretch flat :loading="!initialized">
          <q-avatar>
            <q-img :src="userAvatar" />
          </q-avatar>
          <span class="q-pl-sm">
            {{ userName }}
          </span>
          <q-menu fit>
            <q-list>
              <q-item clickable @click="signOut">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section> {{ $t('signOut') }} </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="text-center q-pa-md" v-html="$t('copyrightText')" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import gravatar from 'gravatar';
import { KeycloakProfile } from 'keycloak-js';

type Data = {
  initialized: boolean;
  userProfile?: KeycloakProfile;
};

export default defineComponent({
  name: 'IndexPage',
  data(): Data {
    return {
      initialized: false,
      userProfile: undefined,
    };
  },
  computed: {
    userAvatar(): string {
      return gravatar.url(this.userProfile?.email || '');
    },
    userName(): string {
      return this.userProfile
        ? `${this.userProfile.firstName} ${this.userProfile.lastName}`
        : '';
    },
  },
  async beforeMount() {
    if (this.initialized) {
      return;
    }

    this.userProfile = await this.$keycloak.loadUserProfile();

    this.initialized = true;
  },
  methods: {
    signOut() {
      this.$keycloak.logoutFn();
    },
  },
});
</script>
