<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const items = computed((): any[] => {
  return route.matched
    .filter((item) => !item.meta?.hideCrumb)
    .map((item) => {
      return {
        title: item.meta?.title || item.name,
        to: {
          name: item.name,
          params: Object.keys(route.params)
            .filter((key) => item.path.includes(`:${key}`))
            .reduce((cur, key) => {
              return Object.assign(cur, { [key]: route.params[key] });
            }, {}),
        },
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
