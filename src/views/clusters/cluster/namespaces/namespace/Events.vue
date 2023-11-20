<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Events ({{ namespaceName }})</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-table>
            <thead>
            <tr>
              <th>Type</th>
              <th>Reason</th>
              <th>Message</th>
              <th>Object</th>
              <th>Last Seen</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="event in getNamespacedList(clusterName,namespaceName,'v1','Event')" :key="event.metadata.uid">
              <td>
                <v-chip :color="eventTypeColor(event.type)">
                  {{ event.type }}
                </v-chip>
              </td>
              <td>
                {{ event.reason }}
              </td>
              <td>
                {{ event.message }}
              </td>
              <td>
                {{ `${event.involvedObject.kind}/${event.involvedObject.name}` }}
              </td>
              <td class="text-no-wrap">
                {{ formatDate(event.lastTimestamp) }}
              </td>
            </tr>
            </tbody>
          </v-table>
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

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

function eventTypeColor(type: string): string {
  switch (type) {
    case "Normal":
      return "info"
    case "Warning":
      return "error"
    default:
      return ""
  }
}
</script>
