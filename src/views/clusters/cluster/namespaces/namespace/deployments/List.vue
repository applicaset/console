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
              {{ item.status?.readyReplicas ? `${item.status.readyReplicas}/${item.status.availableReplicas}` : "-" }}
            </template>
            <template #item.metadata.creationTimestamp="{value}">
              {{ formatDate(value) }}
            </template>
            <template #item.status.conditions="{value}">
                <v-chip v-for="condition in value" :key="condition.type" :color="conditionColor(condition)" class="mx-1">
                  {{ condition.type}}
                </v-chip>
            </template>
            <template #item._actions="{item}">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon variant="text" color="" v-bind="props">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item base-color="red" @click="openDeleteDialog(item.metadata.name)" prepend-icon="mdi-delete" title="Delete" />
                </v-list>
              </v-menu>
              <v-dialog
                v-model="deleteDialog[item.metadata.name]"
                width="auto"
              >
                <v-card title="Delete Confirmation">
                  <v-card-text>
                    Remove Deployment <b>{{ item?.metadata.name }}</b> from namespace <b>{{ item?.metadata.namespace }}</b>?
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="" @click="closeDeleteDialog(item.metadata.name)">Cancel</v-btn>
                    <v-btn color="error" :loading="deleting[item.metadata.name]"
                           @click="doDeleteDeployment(item.metadata.name)">Remove
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import { formatDistanceToNow } from "date-fns";
import { VDataTable } from "vuetify/components";
import { inject, ref } from "vue";
import { Deployment } from "@/types/apps-v1";
import { deleteDeployment } from "@/api/apps-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Deployments", align: "center", key: "status.readyReplicas", sortable: false },
  { title: "Replicas", align: "center", key: "spec.replicas" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
  { title: "Conditions", align: "center", key: "status.conditions" },
  { title: "", align: "center", key: "_actions", sortable: false }
] as InstanceType<typeof VDataTable>['headers'];

function formatDate(date: string): string {
  return formatDistanceToNow(new Date(date));
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

const deleteDialog = ref<{ [name: string]: boolean }>({});
const deleting = ref<{ [name: string]: boolean }>({});

function openDeleteDialog(name: string) {
  deleteDialog.value[name] = true;
}

function closeDeleteDialog(name: string) {
  deleteDialog.value[name] = false;
}

async function doDeleteDeployment(name: string) {
  deleting.value[name] = true;

  try {
    await deleteDeployment(axios, clusterName, namespaceName, name);
    closeDeleteDialog(name);
  } finally {
    deleting.value[name] = false;
  }
}
</script>
