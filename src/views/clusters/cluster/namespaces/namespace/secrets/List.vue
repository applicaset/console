<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Secrets
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'v1','Secret') as Secret[]"
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
                  <v-list-item prepend-icon="mdi-pencil" title="Edit" :to="{name:'SecretEdit', params:{secretName:item.metadata.name}}" />
                  <v-list-item base-color="red" @click="openDeleteDialog(item.metadata.name)" prepend-icon="mdi-delete" title="Delete" />
                </v-list>
              </v-menu>
              <v-dialog
                v-model="deleteDialog[item.metadata.name]"
                width="auto"
              >
                <v-card title="Delete Confirmation">
                  <v-card-text>
                    Remove Secret <b>{{ item?.metadata.name }}</b> from namespace <b>{{ item?.metadata.namespace }}</b>?
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn color="" @click="closeDeleteDialog(item.metadata.name)">Cancel</v-btn>
                    <v-btn color="error" :loading="deleting[item.metadata.name]"
                           @click="doDeleteSecret(item.metadata.name)">Remove
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
import { Secret } from "@/types/v1";
import { deleteSecret } from "@/api/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Keys", align: "start", key: "data" },
  { title: "Type", align: "start", key: "type" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" },
  { title: "", align: "center", key: "_actions", sortable: false }
] as InstanceType<typeof VDataTable>['headers'];

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

async function doDeleteSecret(name: string) {
  deleting.value[name] = true;

  try {
    await deleteSecret(axios, clusterName, namespaceName, name);
    closeDeleteDialog(name);
  } finally {
    deleting.value[name] = false;
  }
}
</script>
