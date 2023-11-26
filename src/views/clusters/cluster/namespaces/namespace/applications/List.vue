<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Applications</h2>
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
