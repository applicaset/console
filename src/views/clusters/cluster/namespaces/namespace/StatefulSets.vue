<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Stateful Sets
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'apps/v1','StatefulSet')"
            multi-sort
          >
            <template #item.status.readyReplicas="{item}">
              {{ `${item.status.readyReplicas}/${item.status.availableReplicas}` }}
            </template>
            <template #item.metadata.creationTimestamp="{value}">
              {{ formatDate(value) }}
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { formatDistance } from "date-fns";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Pods", align: "center", key: "status.readyReplicas", sortable: false },
  { title: "Replicas", align: "center", key: "spec.replicas" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}
</script>
