<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Persistent Volume Claims
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'v1','PersistentVolumeClaim')"
            multi-sort
          >
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
import { VDataTable } from "vuetify/components";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Storage Class", align: "start", key: "spec.storageClassName" },
  { title: "Size", align: "start", key: "spec.resources.requests.storage" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
  { title: "Status", align: "center", key: "status.phase" }
] as InstanceType<typeof VDataTable>['headers'];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}
function phaseColor(phase: any): string {
  switch (phase) {
    case "Pending":
      return "warning"
    case "Bound":
      return "success"
    default:
      return ""
  }
}
</script>
