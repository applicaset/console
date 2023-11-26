<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Cron Jobs</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="
              getNamespacedList(
                clusterName,
                namespaceName,
                'batch/v1',
                'CronJob',
              ) as CronJob[]
            "
            multi-sort
          >
            <template #item.status.active="{ value }">
              {{ value?.length || 0 }}
            </template>
            <template #item.status.lastScheduleTime="{ value }">
              {{ formatDate(value) }}
            </template>
            <template #item.metadata.creationTimestamp="{ value }">
              {{ formatDate(value) }}
            </template>
            <template #item._actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon variant="text" color="" v-bind="props">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    prepend-icon="mdi-pencil"
                    title="Edit"
                    :to="{
                      name: 'CronJobEdit',
                      params: { cronJobName: item.metadata.name },
                    }"
                  />
                  <v-list-item
                    base-color="red"
                    @click="openDeleteDialog(item.metadata.name)"
                    prepend-icon="mdi-delete"
                    title="Delete"
                  />
                </v-list>
              </v-menu>
              <v-dialog v-model="deleteDialog[item.metadata.name]" width="auto">
                <v-card title="Delete Confirmation">
                  <v-card-text>
                    Remove Cron Job <b>{{ item?.metadata.name }}</b> from
                    namespace <b>{{ item?.metadata.namespace }}</b
                    >?
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color=""
                      @click="closeDeleteDialog(item.metadata.name)"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="error"
                      :loading="deleting[item.metadata.name]"
                      @click="doDeleteCronJob(item.metadata.name)"
                      >Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table-virtual>
        </v-card>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { formatDistanceToNow } from "date-fns";
import { VDataTable } from "vuetify/components";
import { inject, ref } from "vue";
import { CronJob } from "@/types/batch-v1";
import { deleteCronJob } from "@/api/batch-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Schedule", align: "start", key: "spec.schedule", sortable: false },
  { title: "Suspend", align: "start", key: "spec.suspend" },
  { title: "Active", align: "start", key: "status.active" },
  { title: "Last Schedule", align: "start", key: "status.lastScheduleTime" },
  { title: "Age", align: "start", key: "metadata.creationTimestamp" },
  { title: "", align: "center", key: "_actions", sortable: false },
] as InstanceType<typeof VDataTable>["headers"];

function formatDate(date: string): string {
  return formatDistanceToNow(new Date(date));
}
const deleteDialog = ref<{ [name: string]: boolean }>({});
const deleting = ref<{ [name: string]: boolean }>({});

function openDeleteDialog(name: string) {
  deleteDialog.value[name] = true;
}

function closeDeleteDialog(name: string) {
  deleteDialog.value[name] = false;
}

async function doDeleteCronJob(name: string) {
  deleting.value[name] = true;

  try {
    await deleteCronJob(axios, clusterName, namespaceName, name);
    closeDeleteDialog(name);
  } finally {
    deleting.value[name] = false;
  }
}
</script>
