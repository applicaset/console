<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Edit Persistent Volume Claim: {{ persistentVolumeClaimName }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updatePersistentVolumeClaim">
          <v-card>
            <v-card-text>
              <v-textarea
                v-mersistentVolumeClaimel="persistentVolumeClaimYaml"
                auto-grow
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingPersistentVolumeClaim"
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
import { replacePersistentVolumeClaim } from "@/api/v1";
import { PersistentVolumeClaim } from "@/types/v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const persistentVolumeClaimName = route.params
  .persistentVolumeClaimName as string;

const dataStore = useDataStore();

const persistentVolumeClaim = dataStore.getResource(
  clusterName,
  namespaceName,
  "v1",
  "PersistentVolumeClaim",
  persistentVolumeClaimName,
);

const persistentVolumeClaimYaml = ref<string>(yaml.dump(persistentVolumeClaim));

const updatingPersistentVolumeClaim = ref(false);

async function updatePersistentVolumeClaim() {
  updatingPersistentVolumeClaim.value = true;

  try {
    await replacePersistentVolumeClaim(
      axios,
      clusterName,
      namespaceName,
      persistentVolumeClaimName,
      yaml.load(persistentVolumeClaimYaml.value) as PersistentVolumeClaim,
    );
  } finally {
    updatingPersistentVolumeClaim.value = false;
  }
}
</script>
