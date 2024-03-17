<template>
  <v-container>
    <v-row>
      <v-btn :to="{ name: 'ApplicationsNewGit' }" variant="plain">
        Back to Select Git Method
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h1">New GitHub Application</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <h2 class="text-h2">Source</h2>
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts"></script>
