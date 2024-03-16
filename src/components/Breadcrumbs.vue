<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const items = computed(() => {
  return route.matched.map((item) => {
    return {
      title: item.meta?.title || item.name,
      to: item.path,
    };
  });
});
</script>
<template>
  <v-breadcrumbs :items="items" icon="mdi-home">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
