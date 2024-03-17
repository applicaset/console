<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Role Bindings</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card variant="outlined">
          <v-data-table-virtual
            :headers="headers"
            :items="
              getNamespacedList(
                clusterName,
                namespaceName,
                'rbac.authorization.k8s.io/v1',
                'RoleBinding',
              ) as RoleBinding[]
            "
            multi-sort
            :sort-by="sortBy"
          >
            <template #item.subjects="{ value }">
              <v-chip
                v-for="subject in value"
                :key="subject.name"
                class="mx-1"
                :prepend-icon="subjectKindIcon(subject.kind)"
                :text="subject.name"
              />
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
                      name: 'RoleBindingEdit',
                      params: { roleBindingName: item.metadata.name },
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
                    Remove RoleBinding <b>{{ item?.metadata.name }}</b> from
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
                      @click="doDeleteRoleBinding(item.metadata.name)"
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
import { VDataTableVirtual } from "vuetify/components";
import { inject, ref } from "vue";
import { RoleBinding } from "@/types/rbac-authorization-k8s-io-v1";
import { deleteRoleBinding } from "@/api/rbac-authorization-k8s-io-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers: InstanceType<typeof VDataTableVirtual>["headers"] = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Bindings", align: "start", key: "subjects" },
  {
    title: "Age",
    align: "center",
    key: "metadata.creationTimestamp",
    cellProps: { class: "text-no-wrap" },
  },
  { title: "", align: "center", key: "_actions", sortable: false },
];

const sortBy: InstanceType<typeof VDataTableVirtual>["sortBy"] = [
  {
    key: "metadata.creationTimestamp",
    order: "desc",
  },
];

function formatDate(date: string): string {
  return formatDistanceToNow(new Date(date), { includeSeconds: true });
}

function subjectKindIcon(kind: string): string {
  switch (kind) {
    case "User":
      return "mdi-account-box";
    case "Group":
      return "mdi-account-group";
    case "ServiceAccount":
      return "mdi-shield-account";
    default:
      return "";
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

async function doDeleteRoleBinding(name: string) {
  deleting.value[name] = true;

  try {
    await deleteRoleBinding(axios, clusterName, namespaceName, name);
    closeDeleteDialog(name);
  } finally {
    deleting.value[name] = false;
  }
}
</script>
