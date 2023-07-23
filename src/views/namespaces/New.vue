<template>
  <div class="container py-2">
    <breadcrumb />
    <div class="row justify-content-between">
      <h1 class="w-auto">New Namespace</h1>
    </div>
    <div class="row gap-2">
      <form novalidate :disabled="submitting" @submit.prevent="submit">
        <fieldset class="row g-2">
          <div class="col-12">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              required
              v-model.trim="namespace.metadata.name"
            />
          </div>
          <div class="col-12">
            <input type="submit" class="btn btn-primary" value="Create" />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Namespace } from "@/types";
import keycloak from "@/plugins/keycloak";

type Data = {
  namespace: Partial<Namespace>;
  submitting: boolean;
};

export default defineComponent({
  components: { Breadcrumb },
  data(): Data {
    return {
      namespace: {
        metadata: {
          name: "",
        },
      },
      submitting: false,
    };
  },
  methods: {
    async submit(): Promise<void> {
      this.submitting = true;

      try {
        await this.$http.post("/api/v1/namespaces", this.namespace);

        await this.$router.push({ name: "Namespaces" });
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
  },
});
</script>
