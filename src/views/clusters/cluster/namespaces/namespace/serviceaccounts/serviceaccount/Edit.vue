<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Edit Service Account: {{ serviceAccountName }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateServiceAccount">
          <v-card>
            <v-card-text>
              <v-textarea v-model="serviceAccountYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn type="submit" variant="tonal" color="primary" :loading="updatingServiceAccount">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { inject, ref } from "vue";
import yaml from "js-yaml";
import { replaceServiceAccount } from "@/api/v1";
import { ServiceAccount } from "@/types/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const serviceAccountName = route.params.serviceAccountName as string;

const dataStore = useDataStore();

const serviceAccount = dataStore.getResource(clusterName, namespaceName, "v1", "ServiceAccount", serviceAccountName);


const serviceAccountYaml = ref<string>(yaml.dump(serviceAccount));

const updatingServiceAccount = ref(false);

async function updateServiceAccount() {
  updatingServiceAccount.value = true;

  try {
    await replaceServiceAccount(axios, clusterName, namespaceName, serviceAccountName, yaml.load(serviceAccountYaml.value) as ServiceAccount);
  } finally {
    updatingServiceAccount.value = false;
  }
}

</script>
