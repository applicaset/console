<template>
  <v-navigation-drawer>
    <v-list>
      <template v-for="apiGroup in apiGroups">
        <template v-for="version in apiGroup.versions">
          <v-list-subheader>
            {{ version.groupVersion }}
          </v-list-subheader>
          <v-list-item
            v-for="resource in version.resources"
            v-show="!resource.namespaced && !resource.name.includes('/')"
            :to="{
              name: 'ResourcesIndex',
              params: {
                groupVersion: version.groupVersion,
                resourceName: resource.name,
              },
            }"
          >
            <v-list-item-title>
              {{ resource.kind }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts">
import keycloak from "@/plugins/keycloak";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    apiGroups: [],
  }),
  async beforeMount() {
    if (keycloak.authenticated) {
      const apiRes = await axios.get(
        "https://ash1.clusters.applicaset.com/api",
        {
          headers: {
            Authorization: `Bearer ${keycloak.idToken}`,
          },
        },
      );

      const apiGroupCore = {
        name: "core",
        versions: [],
      };

      for (const version of apiRes.data.versions) {
        const apiVRes = await axios.get(
          `https://ash1.clusters.applicaset.com/api/${version}`,
          {
            headers: {
              Authorization: `Bearer ${keycloak.idToken}`,
            },
          },
        );

        apiGroupCore.versions.push(apiVRes.data);
      }

      this.apiGroups.push(apiGroupCore);

      const apisVRes = await axios.get(
        "https://ash1.clusters.applicaset.com/apis",
        {
          headers: {
            Authorization: `Bearer ${keycloak.idToken}`,
          },
        },
      );

      for (const group of apisVRes.data.groups) {
        const apiGroup = {
          name: group.name,
          versions: [],
        };

        const apiVRes = await axios.get(
          `https://ash1.clusters.applicaset.com/apis/${group.preferredVersion.groupVersion}`,
          {
            headers: {
              Authorization: `Bearer ${keycloak.idToken}`,
            },
          },
        );

        apiGroup.versions.push(apiVRes.data);

        this.apiGroups.push(apiGroup);
      }
    }
  },
});
</script>
