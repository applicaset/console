<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Job: {{ jobName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateJob">
          <v-card>
            <v-card-text>
              <v-textarea v-model="jobYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingJob"
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
import { replaceJob } from "@/api/batch-v1";
import { Job } from "@/types/batch-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const jobName = route.params.jobName as string;

const dataStore = useDataStore();

const job = dataStore.getResource(
  clusterName,
  namespaceName,
  "batch/v1",
  "Job",
  jobName,
);

const jobYaml = ref<string>(yaml.dump(job));

const updatingJob = ref(false);

async function updateJob() {
  updatingJob.value = true;

  try {
    await replaceJob(
      axios,
      clusterName,
      namespaceName,
      jobName,
      yaml.load(jobYaml.value) as Job,
    );
  } finally {
    updatingJob.value = false;
  }
}
</script>
