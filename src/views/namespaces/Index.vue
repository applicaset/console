<template>
  <div class="container py-2">
    <breadcrumb />
    <div class="row">
      <div class="col-auto">
        <div class="card">
          <div class="card-body">
            <p>
              To connect to the cluster, you need to have
              <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">
                kubectl
              </a>
              and
              <a href="https://github.com/int128/kubelogin#setup">
                oidc-login
              </a>
              installed.
              <br />
              Then run the command bellow:
            </p>
            <highlightjs language="shell" :code="code" />
          </div>
        </div>
      </div>
    </div>
    <div class="row py-2 justify-content-between">
      <h1 class="w-auto">Namespaces</h1>
      <div class="col-auto">
        <router-link :to="{ name: 'NamespacesNew' }" class="btn btn-primary">
          Create
        </router-link>
      </div>
    </div>
    <div class="row">
      <div v-if="loadingNamespaces" v-for="x in 3" :key="x" class="col-4">
        <div class="card placeholder-glow">
          <div class="card-body text-center placeholder">
            <h4 class="card-title my-2">&nbsp;</h4>
          </div>
        </div>
      </div>
      <div
        v-else
        v-for="namespace in namespaceList?.items"
        :key="namespace.metadata.uid"
        class="col-4"
      >
        <div class="card">
          <div class="card-body">
            <h4 class="card-title my-2">
              {{ namespace.metadata.name }}
            </h4>
            <div>
              Status:
              <b>{{ namespace.status?.phase }}</b>
            </div>
            <div>
              Tenant:
              <b>{{ extractTenantName(namespace) }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Namespace, NamespaceList } from "@/types";

type Data = {
  loadingNamespaces: boolean;
  namespaceList?: NamespaceList;
};

export default defineComponent({
  components: { Breadcrumb },
  data(): Data {
    return {
      loadingNamespaces: false,
      namespaceList: undefined,
    };
  },
  computed: {
    code() {
      return `kubectl config set-cluster applicaset-ash1 --server=https://ash1.clusters.applicaset.com
kubectl config set-credentials applicaset-oidc --exec-api-version=client.authentication.k8s.io/v1beta1 --exec-command=kubectl --exec-arg=oidc-login --exec-arg=get-token --exec-arg=--oidc-issuer-url=https://auth.applicaset.com/realms/applicaset --exec-arg=--oidc-client-id=applicaset --exec-arg='--oidc-extra-scope=openid groups email profile'
kubectl config set-context applicaset-oidc@applicaset-ash1 --cluster=applicaset-ash1 --user=applicaset-oidc
kubectl config use-context applicaset-oidc@applicaset-ash1`;
    },
  },
  mounted() {
    this.loadNamespaces();
  },
  methods: {
    async loadNamespaces() {
      this.loadingNamespaces = true;

      try {
        const res = await this.$http.get("/api/v1/namespaces");

        this.namespaceList = res.data as NamespaceList;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingNamespaces = false;
      }
    },
    extractTenantName(namespace: Namespace): string | undefined {
      return namespace.metadata.ownerReferences[0]?.name;
    },
  },
});
</script>
