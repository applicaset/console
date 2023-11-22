<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Pods
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'v1','Pod')"
            multi-sort
          >
            <template #item.status.containerStatuses="{value}">
              <v-icon v-for="containerStatus in value" :color="containerStatusColor(containerStatus)" icon="mdi-square-rounded" />
            </template>
            <template #item.metadata.creationTimestamp="{value}">
              {{ formatDate(value) }}
            </template>
            <template #item.status.phase="{value}">
              <v-chip :color="phaseColor(value)">
                {{ value }}
              </v-chip>
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
  { title: "Containers", align: "start", key: "status.containerStatuses" },
  { title: "QoS", align: "start", key: "status.qosClass" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
  { title: "Status", align: "center", key: "status.phase" }
];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}

function containerStatusColor(containerStatus: any): string {
  if (containerStatus.state.running) {
    return 'success'
  }

  if (containerStatus.state.waiting) {
    return 'warning'
  }

  if (containerStatus.state.terminated) {
    return 'grey'
  }

  return ''
}
function phaseColor(phase: any): string {
  switch (phase) {
    case "Pending":
      return "warning"
    case "Running":
      return "success"
    default:
      return ""
  }
}
</script>
