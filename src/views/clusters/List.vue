<script setup lang="ts">
import { useDataStore } from "@/store/data";
import { storeToRefs } from "pinia";
import router from "@/router";

const dataStore = useDataStore();

const { getClusters } = storeToRefs(dataStore);

const clusterNames = Object.keys(getClusters.value);

if (clusterNames.length === 1) {
  router.push({ name: "Cluster", params: { clusterName: clusterNames[0] } });
}
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <div class="text-h2">Clusters</div>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(val, key) in getClusters" :key="key">
        <v-card
          variant="outlined"
          :to="{ name: 'Cluster', params: { clusterName: key } }"
        >
          <v-card-title class="text-center">{{ key }}</v-card-title>
          <v-card-subtitle class="text-center pb-2">{{ val }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
