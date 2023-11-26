<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Edit Stateful Set: {{ statefulSetName }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateStatefulSet">
          <v-card>
            <v-card-text>
              <v-textarea v-model="statefulSetYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn type="submit" variant="tonal" color="primary" :loading="updatingStatefulSet">Update</v-btn>
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
import { replaceStatefulSet } from "@/api/apps-v1";
import { StatefulSet } from "@/types/apps-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const statefulSetName = route.params.statefulSetName as string;

const dataStore = useDataStore();

const statefulSet = dataStore.getResource(clusterName, namespaceName, "apps/v1", "StatefulSet", statefulSetName);


const statefulSetYaml = ref<string>(yaml.dump(statefulSet));

const updatingStatefulSet = ref(false);

async function updateStatefulSet() {
  updatingStatefulSet.value = true;

  try {
    await replaceStatefulSet(axios, clusterName, namespaceName, statefulSetName, yaml.load(statefulSetYaml.value) as StatefulSet);
  } finally {
    updatingStatefulSet.value = false;
  }
}
</script>
