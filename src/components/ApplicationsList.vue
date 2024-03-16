<template>
  <v-data-iterator
    :items="getApplicationNames(clusterName, namespaceName)"
    class="flex-grow-1"
  >
    <template #no-data>
      <v-row>
        <v-col cols="12" class="text-center">
          <div>No Applications Deployed</div>
          <v-btn variant="text"> Deploy Application </v-btn>
        </v-col>
      </v-row>
    </template>
    <template #default="{ items }">
      <v-row>
        <v-col cols="12" v-for="item in items" :key="item.raw">
          <v-card :title="item.raw">
            <v-card-text>
              <v-list>
                <v-list-item
                  v-for="workload in getApplicationWorkloads(
                    clusterName,
                    namespaceName,
                    item.raw,
                  )"
                  :key="workload.metadata.uid"
                  :title="
                    workload.metadata.labels['app.kubernetes.io/name'] ||
                    workload.metadata.name
                  "
                  :subtitle="`Version: ${workload.metadata.labels['app.kubernetes.io/version']}`"
                >
                  <template #append>
                    <v-row>
                      <v-col>
                        {{
                          workload.status?.readyReplicas
                            ? `${workload.status.readyReplicas}/${workload.status.availableReplicas}`
                            : "-"
                        }}
                      </v-col>
                    </v-row>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/store/data";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  clusterName: string;
  namespaceName: string;
}>();

const dataStore = useDataStore();

const { getApplicationNames, getApplicationWorkloads } = storeToRefs(dataStore);
</script>
