<template>
  <div>
    <v-overlay
      :model-value="!initialized"
      class="align-center justify-center"
      :persistent="true"
    >
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <router-view v-if="initialized" />
  </div>
</template>
<script setup lang="ts">
import { loadNamespaces } from "@/api/v1";
import { useRoute } from "vue-router";
import { inject, ref } from "vue";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;

const initialized = ref(false);

loadNamespaces(axios, clusterName as string).then(
  () => (initialized.value = true),
);
</script>
