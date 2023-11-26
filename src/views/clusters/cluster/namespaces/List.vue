<template>
  <v-container>
    <v-data-iterator :items="getList(clusterName, 'v1', 'Namespace')">
      <template #header>
        <v-toolbar :flat="true" color="transparent">
          <v-toolbar-title> Namespaces </v-toolbar-title>
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            :disabled="!canCreateNamespace"
          >
            Add
            <v-dialog
              v-model="addNamespaceDialog"
              activator="parent"
              max-width="480"
            >
              <v-form @submit.prevent="createNamespace">
                <v-card>
                  <v-card-title>Add Namespace</v-card-title>
                  <v-card-text>
                    <v-text-field
                      label="Name"
                      v-model.trim="newNamespace.metadata.name"
                      :autofocus="true"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn type="submit" :loading="creatingNamespace">
                      Create
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-btn>
        </v-toolbar>
      </template>
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.raw.metadata.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
          >
            <v-card
              :to="{
                name: 'Namespace',
                params: { namespaceName: item.raw.metadata.name },
              }"
            >
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-subtitle>Name</v-list-item-subtitle>
                    <v-list-item-title>
                      {{ item.raw.metadata.name }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-subtitle>Status</v-list-item-subtitle>
                    <v-list-item-title>
                      {{ item.raw.status.phase }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-subtitle>Tenant</v-list-item-subtitle>
                    <v-list-item-title>
                      {{
                        item.raw.metadata.labels["capsule.clastix.io/tenant"]
                      }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject, ref } from "vue";
import { Namespace } from "@/types/v1";
import { useDataStore } from "@/store/data";
import { storeToRefs } from "pinia";
import { canI } from "@/api/authorization-k8s-io-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;

const dataStore = useDataStore();

const { getList } = storeToRefs(dataStore);

const clusterUrl = dataStore.getClusterUrl(clusterName);

const addNamespaceDialog = ref(false);
const creatingNamespace = ref(false);

const newNamespaceValue: Namespace = {
  apiVersion: "v1",
  kind: "Namespace",
  metadata: {
    name: "",
  },
  spec: {},
};

let newNamespace = ref<Namespace>(newNamespaceValue);

const canCreateNamespace = ref(false);

canI(axios, clusterName, {
  verb: "create",
  resource: "namespaces",
}).then((allowed: boolean) => (canCreateNamespace.value = allowed));

async function createNamespace() {
  creatingNamespace.value = true;

  try {
    await axios.post(`${clusterUrl}/api/v1/namespaces`, newNamespace.value);
    newNamespace.value = newNamespaceValue;
    console.log(
      `Namespace '${newNamespace.value.metadata.name}' created successfully.`,
    );
    addNamespaceDialog.value = false;
  } finally {
    creatingNamespace.value = false;
  }
}
</script>
