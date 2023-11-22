<template>
  <div>
    <v-navigation-drawer :permanent="true">
      <v-toolbar :flat="true">
        <v-btn icon="mdi-arrow-left" :to="{name:'Namespaces'}" :exact="true" />
        <v-toolbar-title>
          {{ namespaceName}}
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{name: 'NamespaceDashboard'}" />
        <v-list-item prepend-icon="mdi-application" title="Applications" :to="{name: 'Applications'}" />
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-package-variant-closed"
              title="Workloads"
            />
          </template>
          <v-list-item title="Pods" :to="{name: 'Pods'}" />
          <v-list-item title="Deployments" :to="{name: 'Deployments'}" />
          <v-list-item title="Stateful Sets" :to="{name: 'StatefulSets'}" />
        </v-list-group>
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props" prepend-icon="mdi-format-list-bulleted" title="Config" />
          </template>
          <v-list-item title="Config Maps" :to="{name: 'ConfigMaps'}" />
          <v-list-item title="Secrets" :to="{name: 'Secrets'}" />
        </v-list-group>
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props" prepend-icon="mdi-lan" title="Network" />
          </template>
          <v-list-item title="Services" :to="{name: 'Services'}" />
          <v-list-item title="Ingresses" :to="{name: 'Ingresses'}" />
        </v-list-group>
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props" prepend-icon="mdi-nas" title="Storage" />
          </template>
          <v-list-item title="Persistent Volume Claims" :to="{name: 'PersistentVolumeClaims'}" />
        </v-list-group>
        <v-list-item prepend-icon="mdi-clock-time-four-outline" title="Events" :to="{name: 'Events'}" />
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item
              v-bind="props" prepend-icon="mdi-security" title="Access Control" />
          </template>
          <v-list-item title="Service Accounts" :to="{name: 'ServiceAccounts'}" />
          <v-list-item title="Roles" :to="{name: 'Roles'}" />
          <v-list-item title="Role Bindings" :to="{name: 'RoleBindings'}" />
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject } from "vue";
import {
  loadResourceQuotas,
  loadEvents,
  loadPods,
  loadDeployments,
  loadStatefulSets,
  loadDaemonSets,
  loadSecrets,
  loadConfigMaps,
  loadService,
  loadIngresses,
  loadPersistentVolumeClaims,
  loadServiceAccounts,
  loadRoles,
  loadRoleBindings
} from "@/api/api";

const route = useRoute();

const axios: any = inject("axios");

const clusterName = route.params.clusterName as string;
const namespaceName = route.params.namespaceName as string;

loadResourceQuotas(axios, clusterName, namespaceName);
loadEvents(axios, clusterName, namespaceName);
loadPods(axios, clusterName, namespaceName);
loadDeployments(axios, clusterName, namespaceName);
loadStatefulSets(axios, clusterName, namespaceName);
loadDaemonSets(axios, clusterName, namespaceName);
loadSecrets(axios, clusterName, namespaceName);
loadConfigMaps(axios, clusterName, namespaceName);
loadService(axios, clusterName, namespaceName);
loadIngresses(axios, clusterName, namespaceName);
loadPersistentVolumeClaims(axios, clusterName, namespaceName);
loadServiceAccounts(axios, clusterName, namespaceName);
loadRoles(axios, clusterName, namespaceName);
loadRoleBindings(axios, clusterName, namespaceName);
</script>
