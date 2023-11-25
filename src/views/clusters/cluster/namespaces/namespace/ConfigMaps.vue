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
            :items="getNamespacedList(clusterName,namespaceName,'v1','ConfigMap') as ConfigMap[]"
            multi-sort
          >
            <template #item.data="{value}">
              {{ Object.keys(value).join(", ") }}
            </template>
            <template #item.metadata.creationTimestamp="{value}">
              {{ formatDate(value) }}
            </template>
            <template #item._actions="{item}">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon variant="text" color="" v-bind="props">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="openDialog(item.metadata.name)" prepend-icon="mdi-delete" title="Delete" />
                </v-list>
              </v-menu>
              <v-dialog
                v-model="dialog[item.metadata.name]"
                width="auto"
              >
                <v-card title="Delete Confirmation">
                  <v-card-text>
                    Remove Config Map <b>{{ item?.metadata.name }}</b> from namespace <b>{{ item?.metadata.namespace }}</b>?
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="" @click="closeDialog(item.metadata.name)">Cancel</v-btn>
                    <v-btn color="error" :loading="deleting[item.metadata.name]"
                           @click="doDeleteConfigMap(item.metadata.name)">Remove
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
import { ConfigMap } from "@/types/v1";
import { deleteConfigMap } from "@/api/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Keys", align: "start", key: "data" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
  { title: "", align: "center", key: "_actions", sortable: false }
] as InstanceType<typeof VDataTable>["headers"];

function formatDate(date: string): string {
  return formatDistanceToNow(new Date(date));
}

const dialog = ref<{ [name: string]: boolean }>({});
const deleting = ref<{ [name: string]: boolean }>({});

function openDialog(name: string) {
  dialog.value[name] = true;
}

function closeDialog(name: string) {
  dialog.value[name] = false;
}

async function doDeleteConfigMap(name: string) {
  deleting.value[name] = true;

  try {
    await deleteConfigMap(axios, clusterName, namespaceName, name);
    closeDialog(name);
  } finally {
    deleting.value[name] = false;
  }
}
</script>
