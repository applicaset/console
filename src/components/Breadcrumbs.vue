<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const items = computed((): any[] => {
  return route.matched
    .filter((item) => !item.meta?.hideCrumb)
    .map((item) => {
      let title = item.name as string;
      if (item.meta?.title) {
        if (item.meta.title instanceof Function) {
          title = item.meta.title(route);
        } else {
          title = item.meta.title as string;
        }
      }

      return {
        title: title,
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
  <v-breadcrumbs
    :items="items"
    icon="mdi-home"
    class="text-no-wrap overflow-x-auto"
  >
    <template #divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>
