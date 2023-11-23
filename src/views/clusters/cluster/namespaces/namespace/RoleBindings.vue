<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Role Bindings
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table-virtual
            :headers="headers"
            :items="getNamespacedList(clusterName,namespaceName,'rbac.authorization.k8s.io/v1','RoleBinding')"
            multi-sort
          >
            <template #item.subjects="{value}">
              <v-chip v-for="subject in value" :key="subject.name" class="mx-1" :prepend-icon="subjectKindIcon(subject.kind)" :text="subject.name"/>
            </template>
            <template #item.metadata.creationTimestamp="{value}">
              {{ formatDate(value) }}
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
import { formatDistance } from "date-fns";
import { VDataTable } from "vuetify/components";

const route = useRoute();
const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const dataStore = useDataStore();

const { getNamespacedList } = storeToRefs(dataStore);

const headers = [
  { title: "Name", align: "start", key: "metadata.name" },
  { title: "Bindings", align: "start", key: "subjects" },
  { title: "Age", align: "center", key: "metadata.creationTimestamp" }
] as InstanceType<typeof VDataTable>['headers'];

function formatDate(date: string): string {
  return formatDistance(new Date(date), new Date());
}

function subjectKindIcon(kind: string): string {
  switch (kind) {
    case "User":
      return "mdi-account-box"
    case "Group":
      return "mdi-account-group"
    case "ServiceAccount":
      return "mdi-shield-account"
    default:
      return ""
  }
}
</script>
