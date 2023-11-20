<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-h2 mb-2">Cluster "{{ clusterName }}"</h2>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text>
            <p>
              To connect to the cluster,
              you need to have
              <a href="https://kubernetes.io/docs/tasks/tools/#kubectl" target="_blank">kubectl</a>
              and
              <a href="https://github.com/int128/kubelogin#setup" target="_blank">oidc-login</a>
              installed. <br>
              Then run the command bellow:

            </p>
            <pre class="overflow-x-auto border px-4 mt-2">
          <code>
kubectl config set-cluster applicaset-{{ clusterName }} --server=https://{{ clusterName }}.clusters.applicaset.com
kubectl config set-credentials applicaset-oidc --exec-api-version=client.authentication.k8s.io/v1beta1 --exec-command=kubectl --exec-arg=oidc-login --exec-arg=get-token --exec-arg=--oidc-issuer-url=auth.applicaset.com/realms/applicaset --exec-arg=--oidc-client-id=applicaset
kubectl config set-context applicaset-oidc@applicaset-{{ clusterName }} --cluster=applicaset-{{ clusterName }} --user=applicaset-oidc
kubectl config use-context applicaset-oidc@applicaset-{{ clusterName }}</code>
        </pre>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card height="160" class="d-block" :to="{name: 'Namespaces'}">
          <v-card-text class="text-center">
            <v-icon size="xxx-large">
              mdi-layers
            </v-icon>
          </v-card-text>
          <v-card-title class="text-center">
            Namespaces
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const clusterName = route.params.clusterName;
</script>
