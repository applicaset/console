<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Config Map: {{ configMapName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateConfigMap">
          <v-card>
            <v-card-text>
              <v-textarea v-model="configMapYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingConfigMap"
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
import { replaceConfigMap } from "@/api/v1";
import { ConfigMap } from "@/types/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const configMapName = route.params.configMapName as string;

const dataStore = useDataStore();

const configMap = dataStore.getResource(
  clusterName,
  namespaceName,
  "v1",
  "ConfigMap",
  configMapName,
);

const configMapYaml = ref<string>(yaml.dump(configMap));

const updatingConfigMap = ref(false);

async function updateConfigMap() {
  updatingConfigMap.value = true;

  try {
    await replaceConfigMap(
      axios,
      clusterName,
      namespaceName,
      configMapName,
      yaml.load(configMapYaml.value) as ConfigMap,
    );
  } finally {
    updatingConfigMap.value = false;
  }
}
</script>
