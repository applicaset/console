<template>
  <v-container>
    <v-row>
      <v-btn :to="{ name: 'ApplicationsNew' }" variant="plain">
        Back to Select Method
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h1">New Application from Repository</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <h2 class="text-h2">Select a Repository</h2>
      </v-col>
      <v-col
        cols="12"
        v-for="repository in repositories"
        :key="repository.metadata.uid"
      >
        <v-card>
          <div class="d-flex flex-no-wrap">
            <v-img
              :width="100"
              :max-width="100"
              aspect-ratio="1/1"
              cover
              class="ma-4"
              :src="
                repository.metadata.annotations?.['applicaset.com/logoUrl'] ||
                'https://artifacthub.io/image/8d3c5cc3-30a7-47e6-a4d5-fdbe1d14bc44@2x'
              "
            />
            <div>
              <v-card-title class="text-h3">{{
                repository.metadata.name
              }}</v-card-title>
              <v-card-subtitle>
                Version {{ repository.spec.ref.tag }}
              </v-card-subtitle>
              <v-card-text>{{
                repository.metadata.annotations?.["applicaset.com/description"]
              }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useDataStore } from "@/store/data";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { OCIRepository } from "@/types/source-toolkit-fluxcd-io-v1beta2";
import { useRoute } from "vue-router";

const route = useRoute();

const dataStore = useDataStore();

const clusterName = route.params.clusterName as string;

const { getNamespacedList } = storeToRefs(dataStore);

const repositories = computed(() => {
  return getNamespacedList.value(
    clusterName,
    "flux-system",
    "source.toolkit.fluxcd.io/v1beta2",
    "OCIRepository",
  ) as OCIRepository[];
});
</script>
