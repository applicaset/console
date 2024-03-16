<template>
  <v-container>
    <v-row>
      <v-btn
        variant="plain"
        prepend-icon="mdi-chevron-left"
        :to="{ name: 'Namespaces' }"
        >Back to Namespaces</v-btn
      >
    </v-row>
    <v-row>
      <h2 class="text-h1">Namespace "{{ namespaceName }}"</h2>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h2">Quota</h2>
          </v-col>
          <v-col
            v-for="item in resourceQuota"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            :key="item.title"
          >
            <v-card variant="outlined">
              <v-card-text class="text-center">
                <v-progress-circular
                  :model-value="item.percentage"
                  :size="100"
                  color="primary"
                >
                  {{ item.used }}/{{ item.limit }}
                </v-progress-circular>
              </v-card-text>
              <v-card-title class="text-center">{{ item.title }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md=" 12" lg="8" xl="9">
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <h2 class="text-h2 flex-grow-1">Applications</h2>
            <v-btn>New Application</v-btn>
          </v-col>
          <ApplicationsList
            :cluster-name="clusterName"
            :namespace-name="namespaceName"
          />
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md=" 12" lg="4" xl="3">
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <h2 class="text-h2 flex-grow-1">Events</h2>
            <v-btn variant="text" :to="{ name: 'Events' }">More</v-btn>
          </v-col>
        </v-row>
        <v-data-iterator
          :items="
            getNamespacedList(clusterName, namespaceName, 'v1', 'Event').sort(
              sortEvents,
            ) as Event[]
          "
        >
          <template #no-data>
            <v-row>
              <v-col cols="12" class="text-center">
                <div>No Events Recently</div>
              </v-col>
            </v-row>
          </template>
          <template v-slot:default="{ items }">
            <v-row>
              <v-col
                cols="12"
                v-for="{ raw: event } in items"
                :key="event.metadata.uid"
              >
                <v-card variant="outlined">
                  <template v-slot:prepend>
                    <v-icon :color="eventTypeColor(event.type)" size="x-small">
                      mdi-circle
                    </v-icon>
                  </template>
                  <template v-slot:title>
                    {{
                      `${event.involvedObject.kind}/${event.involvedObject.name}`
                    }}
                  </template>
                  <v-card-subtitle class="d-flex my-0">
                    <div class="flex-grow-1">{{ event.reason }}</div>
                    <div>{{ formatDate(event.lastTimestamp) }}</div>
                  </v-card-subtitle>
                  <v-card-text>
                    {{ event.message }}
                  </v-card-text>
                  <td></td>
                  <td></td>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { formatDistanceToNow } from "date-fns";
import ApplicationsList from "@/components/ApplicationsList.vue";
import { Event } from "@/types/v1";
import { computed } from "vue";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = dataStore;

function formatDate(date: string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true,
  });
}

function sortEvents(a: Event, b: Event) {
  return (
    new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime()
  );
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

const resourceQuota = computed(() => {
  const res = [];
  const items = getNamespacedList(
    clusterName,
    namespaceName,
    "v1",
    "ResourceQuota",
  );

  for (const item of items) {
    if (item.status?.hard?.["limits.cpu"]) {
      res.push({
        title: "CPU",
        limit: item.status.hard["limits.cpu"],
        used: item.status.used["limits.cpu"] || "0",
        percentage: 30,
      });
    }
    if (item.status?.hard?.["limits.memory"]) {
      res.push({
        title: "Memory",
        limit: item.status.hard["limits.memory"],
        used: item.status.used["limits.memory"] || "0",
        percentage: 25,
      });
    }
    if (item.status?.hard?.["pods"]) {
      res.push({
        title: "Pods",
        limit: item.status.hard["pods"],
        used: item.status.used["pods"] || "0",
        percentage: 45,
      });
    }
  }

  return res;
});
</script>
