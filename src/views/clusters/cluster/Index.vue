<template>
  <v-container>
    <h2 class="text-h2 mb-2">Cluster "{{ clusterName }}"</h2>
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
        <pre class="overflow-x-auto border px-4">
          <code>
kubectl config set-cluster applicaset-{{ clusterName }} --server=https://{{ clusterName }}.clusters.applicaset.com
kubectl config set-credentials applicaset-oidc --exec-api-version=client.authentication.k8s.io/v1beta1 --exec-command=kubectl --exec-arg=oidc-login --exec-arg=get-token --exec-arg=--oidc-issuer-url=auth.applicaset.com/realms/applicaset --exec-arg=--oidc-client-id=applicaset
kubectl config set-context applicaset-oidc@applicaset-{{ clusterName }} --cluster=applicaset-{{ clusterName }} --user=applicaset-oidc
kubectl config use-context applicaset-oidc@applicaset-{{ clusterName }}
          </code>
        </pre>
      </v-card-text>
    </v-card>
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const clusterName = route.params.clusterName;
</script>
