<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Config Maps
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'v1','ConfigMap')"
            multi-sort
          >
            <template #item.data="{value}">
              {{ Object.keys(value).join(", ") }}
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
  { title: "Keys", align: "start", key: "data" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" }
] as InstanceType<typeof VDataTable>['headers'];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}
</script>
