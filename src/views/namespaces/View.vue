<template>
  <div class="container py-2">
    <breadcrumb />
    <div class="row justify-content-between">
      <h1 class="w-auto">
        {{ namespace?.metadata.name }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Namespace } from "@/types";
import keycloak from "@/plugins/keycloak";

type Data = {
  namespace?: Namespace;
  loadingNamespace: boolean;
};

export default defineComponent({
  components: { Breadcrumb },
  data(): Data {
    return {
      namespace: undefined,
      loadingNamespace: false,
    };
  },
  mounted() {
    this.loadNamespace();
  },
  methods: {
    async loadNamespace(): Promise<void> {
      this.loadingNamespace = true;

      try {
        const res = await this.$http.get(
          `/api/v1/namespaces/${this.$route.params.namespaceName}`
        );

        this.namespace = res.data as Namespace;

        document.title = `${this.namespace.metadata.name} | ApplicaSet Console`;
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingNamespace = false;
      }
    },
  },
});
</script>
