<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Edit Pod: {{ podName }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updatePod">
          <v-card>
            <v-card-text>
              <v-textarea v-model="podYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn type="submit" variant="tonal" color="primary" :loading="updatingPod">Update</v-btn>
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
import { replacePod } from "@/api/v1";
import { Pod } from "@/types/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const podName = route.params.podName as string;

const dataStore = useDataStore();

const pod = dataStore.getResource(clusterName, namespaceName, "v1", "Pod", podName);


const podYaml = ref<string>(yaml.dump(pod));

const updatingPod = ref(false);

async function updatePod() {
  updatingPod.value = true;

  try {
    await replacePod(axios, clusterName, namespaceName, podName, yaml.load(podYaml.value) as Pod);
  } finally {
    updatingPod.value = false;
  }
}

</script>
