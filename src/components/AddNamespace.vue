<template>
  <q-card>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">
        {{ $t('newNamespace') }}
      </div>
      <q-space />
      <q-btn v-if="inDialog" icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form @submit="onSubmit">
      <q-card-section>
        <q-input
          autofocus
          filled
          type="text"
          :label="$t('name')"
          v-model.trim="namespace.metadata.name"
          :rules="[(val) => !!val || $t('fieldIsRequired')]"
        />
      </q-card-section>
      <q-card-actions class="q-pa-md">
        <q-btn
          type="submit"
          icon="send"
          :label="$t('create')"
          color="primary"
          unelevated
          :loading="submitting"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Namespace, createNamespace } from 'src/api/v1-core';
import { Notify } from 'quasar';

type Data = {
  namespace: Partial<Namespace>;
  submitting: boolean;
};

export default defineComponent({
  name: 'AddNamespace',
  props: {
    inDialog: {
      type: Boolean,
      default: false,
    },
  },
  data(): Data {
    return {
      namespace: {
        metadata: {
          name: '',
        },
      },
      submitting: false,
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      this.submitting = true;

      try {
        const res = await createNamespace(this.namespace);

        const namespaceName = res.metadata.name;

        Notify.create({
          type: 'positive',
          message: this.$t('namespaceCreatedSuccessfully', { namespaceName }),
        });

        this.$emit('success', res);
      } catch (e) {
      } finally {
        this.submitting = false;
      }
    },
  },
});
</script>
