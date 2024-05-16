<template>
  <v-container fluid>
    <v-row>
      <v-btn
        variant="plain"
        prepend-icon="mdi-chevron-left"
        :to="{ name: 'NamespaceDashboard' }"
        >Back to Dashboard</v-btn
      >
    </v-row>
    <v-row>
      <v-col>
        <h2 class="text-h2">Events</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="
              getNamespacedList(clusterName, namespaceName, 'v1', 'Event')
            "
            multi-sort
            :sort-by="sortBy"
          >
            <template #item.type="{ value }">
              <v-chip :color="eventTypeColor(value)">
                {{ value }}
              </v-chip>
            </template>
            <template #item.involvedObject="{ value }">
              {{ `${value.kind}: ${value.name}` }}
            </template>
            <template #item.lastTimestamp="{ value }">
              {{ formatDate(value) }}
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { formatDistanceToNow } from "date-fns";
import { VDataTableVirtual } from "vuetify/components";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers: InstanceType<typeof VDataTableVirtual>["headers"] = [
  { title: "Type", align: "center", key: "type" },
  { title: "Reason", align: "start", key: "reason" },
  { title: "Message", align: "start", key: "message", sortable: false },
  { title: "Involved Object", align: "start", key: "involvedObject" },
  {
    title: "Last Seen",
    align: "center",
    key: "lastTimestamp",
    cellProps: { class: "text-no-wrap" },
  },
];

const sortBy: InstanceType<typeof VDataTableVirtual>["sortBy"] = [
  { key: "lastTimestamp", order: "desc" },
];

function formatDate(date: string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true,
  });
}

function eventTypeColor(type: string): string {
  switch (type) {
    case "Normal":
      return "info";
    case "Warning":
      return "error";
    default:
      return "";
  }
}
</script>
