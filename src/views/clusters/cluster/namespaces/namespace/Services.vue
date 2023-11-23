<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Services
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'v1','Service')"
            multi-sort
          >

            <template #item.spec.ports="{value}">
              {{
                value.map((port:any)=>(`${port.port}/${port.protocol}`)).join(", ")
              }}
            </template>

            <template #item.spec.selector="{value}">
              <v-chip v-for="(val,key) in value" :key="key" class="ma-1">
                {{ `${key}=${val}`}}
              </v-chip>
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
import { VDataTable } from "vuetify/components";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Type", align: "start", key: "spec.type" },
  { title: "ClusterIP", align: "start", key: "spec.clusterIP" },
  { title: "Ports", align: "start", key: "spec.ports" },
  { title: "ExternalIP", align: "start", key: "status.loadBalancer.ingress" },
  { title: "Selector", align: "start", key: "spec.selector" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
] as InstanceType<typeof VDataTable>['headers'];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}
</script>
