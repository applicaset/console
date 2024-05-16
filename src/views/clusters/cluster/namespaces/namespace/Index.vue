<template>
  <router-view />
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject } from "vue";
import { loadCronJobs, loadJobs } from "@/api/batch-v1";
import {
  loadConfigMaps,
  loadEvents,
  loadPersistentVolumeClaims,
  loadPods,
  loadResourceQuotas,
  loadSecrets,
  loadService,
  loadServiceAccounts,
} from "@/api/v1";
import { loadDeployments, loadStatefulSets } from "@/api/apps-v1";
import { loadIngresses } from "@/api/networking-k8s-io-v1";
import {
  loadRoleBindings,
  loadRoles,
} from "@/api/rbac-authorization-k8s-io-v1";
import { useDataStore } from "@/store/data";
import { loadByNamespaceAPIVersionKind } from "@/api/api";
import { loadGitHubInstallations } from "@/api/applications-applicaset-com-v1alpha1";

const route = useRoute();

const axios: any = inject("axios");

const dataStore = useDataStore();

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

if (namespaceName !== "current") {
  dataStore.setCurrentNamespaceName(namespaceName);
}

loadResourceQuotas(axios, clusterName, namespaceName);
loadEvents(axios, clusterName, namespaceName);
loadPods(axios, clusterName, namespaceName);
loadDeployments(axios, clusterName, namespaceName);
loadStatefulSets(axios, clusterName, namespaceName);
loadJobs(axios, clusterName, namespaceName);
loadCronJobs(axios, clusterName, namespaceName);
loadSecrets(axios, clusterName, namespaceName);
loadConfigMaps(axios, clusterName, namespaceName);
loadService(axios, clusterName, namespaceName);
loadIngresses(axios, clusterName, namespaceName);
loadPersistentVolumeClaims(axios, clusterName, namespaceName);
loadServiceAccounts(axios, clusterName, namespaceName);
loadRoles(axios, clusterName, namespaceName);
loadRoleBindings(axios, clusterName, namespaceName);
</script>
