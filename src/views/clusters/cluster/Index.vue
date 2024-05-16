<script setup lang="ts">
import { loadNamespaces } from "@/api/v1";
import { useRoute } from "vue-router";
import { inject, ref } from "vue";
import { useDataStore } from "@/store/data";
import router from "@/router";

const route = useRoute();

const axios: any = inject("axios");

const dataStore = useDataStore();

const clusterName = route.params.clusterName as string;

if (clusterName !== "current") {
  dataStore.setCurrentClusterName(clusterName);
}

const initializing = ref(true);

loadNamespaces(axios, clusterName as string).then(
  () => (initializing.value = false),
);
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
