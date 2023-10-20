<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <add-namespace @success="onSuccess" in-dialog style="width: 480px" />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddNamespace from 'components/AddNamespace.vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'AddNamespaceDialog',
  components: { AddNamespace },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    // add other methods
    function show() {
      dialogRef.value?.show();
    }

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      onSuccess() {
        setTimeout(function () {
          onDialogOK();
        }, 100);
      },
      onDialogCancel,
      show,
    };
  },
});
</script>
