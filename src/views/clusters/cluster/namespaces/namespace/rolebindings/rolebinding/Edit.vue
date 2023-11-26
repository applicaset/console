<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2">
          Edit Role Binding: {{ roleBindingName }}
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form @submit.prevent="updateRoleBinding">
          <v-card>
            <v-card-text>
              <v-textarea v-model="roleBindingYaml" auto-grow />
            </v-card-text>
            <v-card-actions>
              <v-btn type="submit" variant="tonal" color="primary" :loading="updatingRoleBinding">Update</v-btn>
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
import { replaceRoleBinding } from "@/api/rbac-authorization-k8s-io-v1";
import { RoleBinding } from "@/types/rbac-authorization-k8s-io-v1";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;
const roleBindingName = route.params.roleBindingName as string;

const dataStore = useDataStore();

const roleBinding = dataStore.getResource(clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding", roleBindingName);


const roleBindingYaml = ref<string>(yaml.dump(roleBinding));

const updatingRoleBinding = ref(false);

async function updateRoleBinding() {
  updatingRoleBinding.value = true;

  try {
    await replaceRoleBinding(axios, clusterName, namespaceName, roleBindingName, yaml.load(roleBindingYaml.value) as RoleBinding);
  } finally {
    updatingRoleBinding.value = false;
  }
}

</script>
