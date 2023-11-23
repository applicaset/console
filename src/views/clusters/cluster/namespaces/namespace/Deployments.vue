<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Deployments
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'apps/v1','Deployment') as Deployment[]"
            multi-sort
          >
            <template #item.status.readyReplicas="{item}">
              {{ item.status ? `${item.status.readyReplicas}/${item.status.availableReplicas}` : "-" }}
            </template>
            <template #item.metadata.creationTimestamp="{value}">
              {{ formatDate(value) }}
            </template>
            <template #item.status.conditions="{value}">
                <v-chip v-for="condition in value" :key="condition.type" :color="conditionColor(condition)" class="mx-1">
                  {{ condition.type}}
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
import { Deployment } from "@/types/apps-v1";
import { VDataTable } from "vuetify/components";

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
  { title: "Conditions", align: "center", key: "status.conditions" }
] as InstanceType<typeof VDataTable>['headers'];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}

function conditionColor(condition: any): string {
  switch (condition.status) {
    case "True":
      return "success"
    case "False":
      return "error"
    case "Unknown":
      return "warning"
    default:
      return ""
  }
}
</script>
