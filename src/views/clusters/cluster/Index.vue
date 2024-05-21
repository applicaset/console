<script setup lang="ts">
import { loadNamespaces } from "@/api/v1";
import { useRoute } from "vue-router";
import { inject, ref } from "vue";
import { useDataStore } from "@/store/data";
import { loadOCIRepositories } from "@/api/source-toolkit-fluxcd-io-v1beta2";

const route = useRoute();

const axios: any = inject("axios");

const dataStore = useDataStore();

const clusterName = route.params.clusterName as string;

if (clusterName !== "current") {
  dataStore.setCurrentClusterName(clusterName);
}

const initializing = ref(true);

async function load() {
  await loadNamespaces(axios, clusterName);
  await loadOCIRepositories(axios, clusterName, "flux-system");
  initializing.value = false;
}

load();
</script>

<template>
  <v-overlay
    contained
    v-model="initializing"
    class="align-center justify-center"
  >
    <v-progress-circular indeterminate color="primary" />
  </v-overlay>
  <router-view v-if="!initializing" />
</template>
