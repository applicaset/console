<template>
  <q-page padding>
    <add-namespace @success="onSuccess" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddNamespace from 'components/AddNamespace.vue';

export default defineComponent({
  name: 'NamespacesNewPage',
  components: { AddNamespace },
  methods: {
    async onSuccess(): Promise<void> {
      await this.$router.push({ name: 'NamespacesList' });
    },
  },
});
</script>
