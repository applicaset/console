<template>
  <div>Loading...</div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject } from "vue";
import { upsertGitHubInstallation } from "@/api/applications-applicaset-com-v1alpha1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const code = route.query.code as string;
const installationId = route.query.installation_id as string;

if (code && installationId) {
  const id = parseInt(installationId, 10);
  upsertGitHubInstallation(axios, clusterName, namespaceName, id, code);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>
