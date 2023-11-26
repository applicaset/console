<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">Edit Role: {{ roleName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateRole">
          <v-card>
            <v-card-text>
              <v-textarea v-model="roleYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn
                type="submit"
                variant="tonal"
                color="primary"
                :loading="updatingRole"
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
import { replaceRole } from "@/api/rbac-authorization-k8s-io-v1";
import { Role } from "@/types/rbac-authorization-k8s-io-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const roleName = route.params.roleName as string;

const dataStore = useDataStore();

const role = dataStore.getResource(
  clusterName,
  namespaceName,
  "rbac.authorization.k8s.io/v1",
  "Role",
  roleName,
);

const roleYaml = ref<string>(yaml.dump(role));

const updatingRole = ref(false);

async function updateRole() {
  updatingRole.value = true;

  try {
    await replaceRole(
      axios,
      clusterName,
      namespaceName,
      roleName,
      yaml.load(roleYaml.value) as Role,
    );
  } finally {
    updatingRole.value = false;
  }
}
</script>
