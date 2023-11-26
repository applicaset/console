<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Secret: {{ secretName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateSecret">
          <v-card>
            <v-card-text>
              <v-textarea v-model="secretYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingSecret"
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
import { replaceSecret } from "@/api/v1";
import { Secret } from "@/types/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const secretName = route.params.secretName as string;

const dataStore = useDataStore();

const secret = dataStore.getResource(
  clusterName,
  namespaceName,
  "v1",
  "Secret",
  secretName,
);

const secretYaml = ref<string>(yaml.dump(secret));

const updatingSecret = ref(false);

async function updateSecret() {
  updatingSecret.value = true;

  try {
    await replaceSecret(
      axios,
      clusterName,
      namespaceName,
      secretName,
      yaml.load(secretYaml.value) as Secret,
    );
  } finally {
    updatingSecret.value = false;
  }
}
</script>
