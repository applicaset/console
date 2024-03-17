<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject, ref } from "vue";
import { Namespace } from "@/types/v1";
import { useDataStore } from "@/store/data";
import { storeToRefs } from "pinia";
import { canI } from "@/api/authorization-k8s-io-v1";
import router from "@/router";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;

const dataStore = useDataStore();

const { getList } = storeToRefs(dataStore);

const clusterUrl = dataStore.getClusterUrl(clusterName);

const addNamespaceDialog = ref(false);
const creatingNamespace = ref(false);
const newNamespaceName = ref("");

const canCreateNamespace = ref(false);

canI(axios, clusterName, {
  verb: "create",
  resource: "namespaces",
}).then((allowed: boolean) => (canCreateNamespace.value = allowed));

async function createNamespace() {
  creatingNamespace.value = true;

  try {
    const newNamespace = {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: {
        name: newNamespaceName.value,
      },
      spec: {},
    } as Namespace;

    await axios.post(`${clusterUrl}/api/v1/namespaces`, newNamespace);
    console.log(`Namespace '${newNamespaceName.value}' created successfully.`);
    await router.push({
      name: "Namespace",
      params: { namespaceName: newNamespaceName.value },
    });
    newNamespaceName.value = "";
    addNamespaceDialog.value = false;
  } finally {
    creatingNamespace.value = false;
  }
}

function closeAddNamespaceDialog() {
  addNamespaceDialog.value = false;
}

function showAddNamespaceDialog() {
  addNamespaceDialog.value = true;
}
</script>

<template>
  <v-container>
    <v-row>
      <v-btn
        variant="plain"
        prepend-icon="mdi-chevron-left"
        :to="{ name: 'ClusterDashboard' }"
        >Back to Cluster Dashboard</v-btn
      >
    </v-row>
    <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <h1 class="text-h1">Namespaces</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          :disabled="!canCreateNamespace"
          @click="showAddNamespaceDialog"
          text="New Namespace"
        />

        <v-dialog v-model="addNamespaceDialog" max-width="360">
          <v-card title="Add Namespace">
            <v-form @submit.prevent="createNamespace">
              <v-card-text class="pb-0">
                <v-text-field
                  label="Name"
                  v-model="newNamespaceName"
                  :autofocus="true"
                />
              </v-card-text>
              <v-card-actions class="px-4">
                <v-btn
                  variant="flat"
                  color="primary"
                  :loading="creatingNamespace"
                  text="Create"
                  type="submit"
                />
                <v-btn
                  variant="text"
                  @click="closeAddNamespaceDialog"
                  text="Cancel"
                />
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="namespace in getList(clusterName, 'v1', 'Namespace')"
        :key="namespace.metadata.uid"
      >
        <v-card
          variant="outlined"
          :to="{
            name: 'Namespace',
            params: { namespaceName: namespace.metadata.name },
          }"
        >
          <v-card-title class="text-center">
            {{ namespace.metadata.name }}
          </v-card-title>
          <v-card-subtitle class="text-center pb-2">
            {{ namespace.status.phase }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
