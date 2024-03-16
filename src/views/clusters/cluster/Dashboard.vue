<template>
  <v-container>
    <v-row>
      <v-btn
        :to="{ name: 'Clusters' }"
        variant="plain"
        prepend-icon="mdi-chevron-left"
      >
        Back to Select Cluster
      </v-btn>
    </v-row>
    <v-row>
      <h1 class="text-h1">Cluster "{{ clusterName }}"</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-card variant="outlined">
          <v-card-text>
            <p>
              To connect to the cluster, you need to have
              <a
                href="https://kubernetes.io/docs/tasks/tools/#kubectl"
                target="_blank"
                class="underline text-primary"
                >kubectl</a
              >
              and
              <a
                href="https://github.com/int128/kubelogin#setup"
                target="_blank"
                class="underline text-primary"
                >oidc-login</a
              >
              installed. <br />
              Then run the command bellow:
            </p>
            <pre class="overflow-x-auto border rounded px-4 py-2">
          <code class="pa-0">
kubectl config set-cluster {{ clusterName }} --server={{ getClusterUrl(clusterName) }}
kubectl config set-credentials applicaset-oidc --exec-api-version=client.authentication.k8s.io/v1beta1 --exec-command=kubectl --exec-arg=oidc-login --exec-arg=get-token --exec-arg=--oidc-issuer-url=https://auth.applicaset.com/realms/applicaset --exec-arg=--oidc-client-id=applicaset
kubectl config set-context applicaset-oidc@{{ clusterName }} --cluster={{ clusterName }} --user=applicaset-oidc
kubectl config use-context applicaset-oidc@{{ clusterName }}</code>
        </pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card variant="outlined" :to="{ name: 'Namespaces' }">
          <v-card-title class="text-center">Namespaces</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDataStore } from "@/store/data";
import { storeToRefs } from "pinia";

const route = useRoute();

const clusterName = route.params.clusterName as string;

const dataStore = useDataStore();

const { getClusterUrl } = storeToRefs(dataStore);
</script>
