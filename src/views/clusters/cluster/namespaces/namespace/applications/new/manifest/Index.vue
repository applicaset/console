<template>
  <v-container>
    <v-row>
      <v-btn :to="{ name: 'ApplicationsNew' }" variant="plain">
        Back to Select Method
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h1">New Application from Manifest</h1>
      </v-col>
    </v-row>
    <v-form @submit.prevent="submit">
      <v-row dense>
        <v-col cols="12">
          <h2 class="text-h2">Manifest</h2>
        </v-col>
        <v-col cols="12">
          <codemirror
            v-model="code"
            :tab-size="2"
            :extensions="extensions"
            :style="{ height: '480px' }"
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" prepend-icon="mdi-check" type="submit"
            >Deploy</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { inject, ref } from "vue";
import { yaml } from "@codemirror/lang-yaml";
import { oneDark } from "@codemirror/theme-one-dark";
import jsYaml from "js-yaml";
import { useRoute } from "vue-router";
import { createByNamespaceAPIVersionKindName } from "@/api/api";
import router from "@/router";
import { useNotificationsStore } from "@/store/notifications";

const route = useRoute();

const axios: any = inject("axios");

const notificationsStore = useNotificationsStore();

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

const code = ref(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
`);
const extensions = [yaml(), oneDark];

async function submit() {
  try {
    const objs = jsYaml.loadAll(code.value) as any[];

    // validate the manifest
    for (const obj of objs) {
      if (
        !obj ||
        !obj.apiVersion ||
        !obj.kind ||
        !obj.metadata ||
        !obj.metadata.name
      ) {
        notificationsStore.addError("Invalid manifest");
        return;
      }

      await deploy(obj, true);
      await deploy(obj, false);
    }

    notificationsStore.addSuccess("Deployed successfully");

    await router.push({
      name: "Applications",
    });
  } catch (e) {
    notificationsStore.addError(e);
  }
}

async function deploy(obj: any, dryRun: boolean) {
  await createByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    obj.apiVersion,
    obj.kind,
    obj,
    dryRun,
  );
}
</script>
