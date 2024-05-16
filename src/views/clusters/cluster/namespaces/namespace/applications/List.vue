<template>
  <v-container>
    <v-row>
      <v-btn
        variant="plain"
        prepend-icon="mdi-chevron-left"
        :to="{ name: 'NamespaceDashboard' }"
        >Back to Dashboard</v-btn
      >
    </v-row>
    <v-row>
      <v-col class="d-flex align-center">
        <h2 class="text-h2 flex-grow-1">Applications</h2>
        <v-btn :to="{ name: 'ApplicationsNew' }">New Application</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ApplicationsList
          :cluster-name="clusterName"
          :namespace-name="namespaceName"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import ApplicationsList from "@/components/ApplicationsList.vue";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
</script>
