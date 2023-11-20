<template>
  <div>
    <v-navigation-drawer :permanent="true">
      <v-list>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{name: 'NamespaceDashboard'}" />
        <v-list-item prepend-icon="mdi-application" title="Applications" :to="{name: 'NamespaceApplications'}" />
        <v-list-item prepend-icon="mdi-package-variant-closed" title="Workloads" />
        <v-list-item prepend-icon="mdi-format-list-bulleted" title="Config" />
        <v-list-item prepend-icon="mdi-lan" title="Network" />
        <v-list-item prepend-icon="mdi-nas" title="Storage" />
        <v-list-item prepend-icon="mdi-clock-time-four-outline" title="Events" :to="{name: 'NamespaceEvents'}" />
        <v-list-item prepend-icon="mdi-security" title="Access Control" />
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject } from "vue";
import { loadResourceQuotas, loadEvents } from "@/api/api";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

loadResourceQuotas(axios, clusterName, namespaceName);
loadEvents(axios, clusterName, namespaceName);
</script>
