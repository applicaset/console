<template>
  <v-container>
    <v-row>
      <v-col>
        {{ $route.params.resourceName }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :items="resourceList?.items" :headers="headers" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import keycloak from "@/plugins/keycloak";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    resourceList: undefined,
  }),
  computed: {
    headers() {
      if (this.resourceList === undefined) return [];

      return this.resourceList.columnDefinitions.map((def) => ({
        title: def.name,
        key: def.name,
      }));
    },
  },
  async beforeMount() {
    if (keycloak.authenticated) {
      const res = await axios.get(
        `https://ash1.clusters.applicaset.com/api/${this.$route.params.groupVersion}/${this.$route.params.resourceName}`,
        {
          headers: {
            Authorization: `Bearer ${keycloak.idToken}`,
            Accept: "application/json;as=Table;g=meta.k8s.io;v=v1",
          },
        },
      );

      this.resourceList = res.data;
    }
  },
});
</script>
