<template>
  <v-container>
    <v-toolbar :flat="true" color="transparent">
      <v-toolbar-title> Clusters </v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col
        v-for="(val, key) in getClusters"
        :key="key"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          :title="`${key}`"
          :subtitle="val"
          :to="{ name: 'Cluster', params: { clusterName: key } }"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
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
