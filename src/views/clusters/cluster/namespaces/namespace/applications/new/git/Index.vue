<template>
  <v-container>
    <v-row>
      <v-btn :to="{ name: 'ApplicationsNew' }" variant="plain">
        Back to Select Method
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h1">New Git Application</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <h2 class="text-h2">Select Git Method</h2>
      </v-col>
      <v-col cols="12" v-for="method in methods" :key="method.title">
        <v-card :disabled="method.disabled" :to="method.to">
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
    title: "GitHub",
    description:
      "You can connect to your GitHub repository and automate building and deploying your application seamless.",
    icon: "mdi-github",
    to: { name: "ApplicationsNewGitGithub" },
  },
  {
    title: "GitLab",
    description:
      "You can connect to your GitLab repository and automate building and deploying your application seamless.",
    icon: "mdi-gitlab",
    disabled: true,
  },
  {
    title: "Custom Git",
    description:
      "You can connect to your self hosted git repository and automate building and deploying your application seamless.",
    icon: "mdi-git",
    disabled: true,
  },
];
</script>
