<template>
  <v-container>
    <v-row>
      <v-btn :to="{ name: 'NamespaceDashboard' }" variant="plain">
        Back to Namespace Dashboard
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h1">New Application</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <h2 class="text-h2">Select Method</h2>
      </v-col>
      <v-col cols="12" v-for="method in methods" :key="method.title">
        <v-card variant="outlined" :disabled="method.disabled" :to="method.to">
          <div class="d-flex flex-no-wrap">
            <v-icon :size="100" class="ma-4">{{ method.icon }}</v-icon>
            <div>
              <v-card-title class="text-h3">{{ method.title }}</v-card-title>
              <v-card-text>{{ method.description }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const methods = [
  {
    title: "From Git",
    description:
      "You can connect to your git repository and automate building and deploying your application seamless.",
    icon: "mdi-git",
    to: { name: "ApplicationsNewGit" },
    disabled: true,
  },
  {
    title: "From Container Image",
    description:
      "Configure and run a container from Docker Hub, GCR, ECR, or any other container registry.",
    icon: "mdi-docker",
    disabled: true,
  },
  {
    title: "From Packages",
    description:
      "Run preconfigured applications like WordPress, Redis, PostgreSQL, ...",
    icon: "mdi-package",
    disabled: true,
  },
  {
    title: "From Manifest",
    description: "Deploy applications from Kubernetes manifest files.",
    icon: "mdi-script-text-outline",
    to: { name: "ApplicationsNewManifest" },
  },
];
</script>
