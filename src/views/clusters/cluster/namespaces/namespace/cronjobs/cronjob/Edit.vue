<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Cron Job: {{ cronJobName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateCronJob">
          <v-card>
            <v-card-text>
              <v-textarea v-model="cronJobYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingCronJob"
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
import { replaceCronJob } from "@/api/batch-v1";
import { CronJob } from "@/types/batch-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const cronJobName = route.params.cronJobName as string;

const dataStore = useDataStore();

const cronJob = dataStore.getResource(
  clusterName,
  namespaceName,
  "batch/v1",
  "CronJob",
  cronJobName,
);

const cronJobYaml = ref<string>(yaml.dump(cronJob));

const updatingCronJob = ref(false);

async function updateCronJob() {
  updatingCronJob.value = true;

  try {
    await replaceCronJob(
      axios,
      clusterName,
      namespaceName,
      cronJobName,
      yaml.load(cronJobYaml.value) as CronJob,
    );
  } finally {
    updatingCronJob.value = false;
  }
}
</script>
