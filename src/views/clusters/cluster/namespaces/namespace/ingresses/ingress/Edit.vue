<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Ingress: {{ ingressName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateIngress">
          <v-card>
            <v-card-text>
              <v-textarea v-model="ingressYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingIngress"
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
import { replaceIngress } from "@/api/networking-k8s-io-v1";
import { Ingress } from "@/types/networking-k8s-io-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const ingressName = route.params.ingressName as string;

const dataStore = useDataStore();

const ingress = dataStore.getResource(
  clusterName,
  namespaceName,
  "networking.k8s.io/v1",
  "Ingress",
  ingressName,
);

const ingressYaml = ref<string>(yaml.dump(ingress));

const updatingIngress = ref(false);

async function updateIngress() {
  updatingIngress.value = true;

  try {
    await replaceIngress(
      axios,
      clusterName,
      namespaceName,
      ingressName,
      yaml.load(ingressYaml.value) as Ingress,
    );
  } finally {
    updatingIngress.value = false;
  }
}
</script>
