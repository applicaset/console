<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Service: {{ serviceName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateService">
          <v-card>
            <v-card-text>
              <v-textarea v-model="serviceYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingService"
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
import { replaceService } from "@/api/v1";
import { Service } from "@/types/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const serviceName = route.params.serviceName as string;

const dataStore = useDataStore();

const service = dataStore.getResource(
  clusterName,
  namespaceName,
  "v1",
  "Service",
  serviceName,
);

const serviceYaml = ref<string>(yaml.dump(service));

const updatingService = ref(false);

async function updateService() {
  updatingService.value = true;

  try {
    await replaceService(
      axios,
      clusterName,
      namespaceName,
      serviceName,
      yaml.load(serviceYaml.value) as Service,
    );
  } finally {
    updatingService.value = false;
  }
}
</script>
