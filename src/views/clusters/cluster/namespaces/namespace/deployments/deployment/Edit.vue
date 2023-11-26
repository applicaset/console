<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Deployment: {{ deploymentName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateDeployment">
          <v-card>
            <v-card-text>
              <v-textarea v-model="deploymentYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingDeployment"
                >Update</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDataStore } from "@/store/data";
import { useRoute } from "vue-router";
import { inject, ref } from "vue";
import yaml from "js-yaml";
import { replaceDeployment } from "@/api/apps-v1";
import { Deployment } from "@/types/apps-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const deploymentName = route.params.deploymentName as string;

const dataStore = useDataStore();

const deployment = dataStore.getResource(
  clusterName,
  namespaceName,
  "apps/v1",
  "Deployment",
  deploymentName,
);

const deploymentYaml = ref<string>(yaml.dump(deployment));

const updatingDeployment = ref(false);

async function updateDeployment() {
  updatingDeployment.value = true;

  try {
    await replaceDeployment(
      axios,
      clusterName,
      namespaceName,
      deploymentName,
      yaml.load(deploymentYaml.value) as Deployment,
    );
  } finally {
    updatingDeployment.value = false;
  }
}
</script>
