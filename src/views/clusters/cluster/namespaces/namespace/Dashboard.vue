<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Dashboard
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="7" xl="8">
        <v-row no-gutters>
          <v-col>
            <v-card title="Quota">
              <v-table>
                <tbody>
                <template v-for="resourceQuota in getNamespacedList(clusterName,namespaceName,'v1','ResourceQuota')">
                  <tr v-for="(v, k) in resourceQuota.spec.hard" :key="k">
                    <td>
                      <v-icon :icon="quotaIcon(`${k}`)" />
                    </td>
                    <td>
                      {{ k }}
                    </td>
                    <td>
                      {{ `${resourceQuota.status.used[k] || "?"} / ${v}` }}
                    </td>
                  </tr>
                </template>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card title="Applications">
              <v-card-text>
                <ApplicationsList :cluster-name="clusterName" :namespace-name="namespaceName" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" lg="5" xl="4">
        <v-card title="Events">
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
              <td>
                {{ formatDate(event.lastTimestamp) }}
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { formatDistance } from "date-fns";
import ApplicationsList from "@/components/ApplicationsList.vue";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

function formatDate(date: string) {
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

function quotaIcon(item: string): string {
  switch (item) {
    case "limits.memory":
      return "mdi-memory"
    case "requests.memory":
      return "mdi-memory"
    case "limits.cpu":
      return "mdi-cpu-64-bit"
    case "requests.cpu":
      return "mdi-cpu-64-bit"
    case "pods":
      return "mdi-package"
    default:
      return ""
  }
}
</script>
