<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section>
        <p>
          To connect to the cluster, you need to have
          <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">
            kubectl
          </a>
          and
          <a href="https://github.com/int128/kubelogin#setup"> oidc-login </a>
          installed.
          <br />
          Then run the command bellow:
        </p>
        <pre
          class="scroll-x overflow-auto q-pa-md q-card--bordered"
        ><code v-text="code" /></pre>
      </q-card-section>
    </q-card>
    <q-table
      flat
      bordered
      grid
      :title="$t('namespaces')"
      :rows="namespaceList?.items"
      :columns="columns"
      row-key="metadata.uid"
      :loading="loadingNamespaces"
      hide-pagination
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          :to="{ name: 'NamespacesNew' }"
          icon="add"
          :label="$t('add')"
          unelevated
          @click.prevent="onAdd"
          :loading="checkingCanCreateNamespace"
          :disable="!canCreateNamespace"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { listNamespaces, Namespace, NamespaceList } from 'src/api/v1-core';
import { Dialog } from 'quasar';
import AddNamespaceDialog from 'components/AddNamespaceDialog.vue';
import { canI } from 'src/api/v1-authorization-k8s-io';

type Data = {
  loadingNamespaces: boolean;
  namespaceList?: NamespaceList;
  canCreateNamespace?: boolean;
  checkingCanCreateNamespace: boolean;
};

export default defineComponent({
  name: 'NamespacesListPage',
  data: (): Data => ({
    loadingNamespaces: false,
    namespaceList: undefined,
    canCreateNamespace: undefined,
    checkingCanCreateNamespace: false,
  }),
  computed: {
    code() {
      return `kubectl config set-cluster applicaset-ash1 --server=https://ash1.clusters.applicaset.com
kubectl config set-credentials applicaset-oidc --exec-api-version=client.authentication.k8s.io/v1beta1 --exec-command=kubectl --exec-arg=oidc-login --exec-arg=get-token --exec-arg=--oidc-issuer-url=auth.applicaset.com/realms/applicaset --exec-arg=--oidc-client-id=applicaset
kubectl config set-context applicaset-oidc@applicaset-ash1 --cluster=applicaset-ash1 --user=applicaset-oidc
kubectl config use-context applicaset-oidc@applicaset-ash1`;
    },
    columns() {
      return [
        {
          name: 'name',
          required: true,
          label: this.$t('name'),
          field: (row: Namespace) => row.metadata.name,
          format: (val: string) => `${val}`,
        },
        {
          name: 'status',
          required: true,
          label: this.$t('status'),
          field: (row: Namespace) => row.status?.phase,
          format: (val: string) => `${val}`,
        },
        {
          name: 'tenant',
          required: true,
          label: this.$t('tenant'),
          field: (row: Namespace) => row.metadata.ownerReferences?.[0]?.name,
          format: (val: string) => `${val}`,
        },
      ];
    },
  },
  mounted() {
    this.loadNamespaces();
    this.checkCanCreateNamespace();
  },
  methods: {
    async loadNamespaces() {
      this.loadingNamespaces = true;

      try {
        this.namespaceList = await listNamespaces();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingNamespaces = false;
      }
    },
    async checkCanCreateNamespace() {
      this.checkingCanCreateNamespace = true;

      try {
        this.canCreateNamespace = await canI('create', 'namespaces');
      } catch (e) {
        console.error(e);
      } finally {
        this.checkingCanCreateNamespace = false;
      }
    },
    async onAdd() {
      Dialog.create({
        title: 'New Namespace',
        component: AddNamespaceDialog,
        componentProps: {},
      }).onOk(() => {
        this.loadNamespaces();
      });
    },
  },
});
</script>
