<script setup lang="ts">
import { loadNamespaces } from "@/api/v1";
import { useRoute } from "vue-router";
import { inject, ref } from "vue";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;

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
