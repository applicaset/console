<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="item in $route.matched"
        :key="item.name"
        class="breadcrumb-item"
        :class="{ active: $route.name === item.name }"
        :aria-current="$route.name === item.name ? 'page' : undefined"
      >
        <template v-if="$route.name === item.name">
          {{ item.meta?.title || item.name }}
        </template>
        <router-link v-else :to="item">
          {{ item.meta?.title || item.name }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Breadcrumb",
  computed: {
    items() {
      return [];
    },
  },
});
</script>
