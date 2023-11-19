<template>
  <div>
    <v-data-iterator :items="namespaces" :loading="loading">
      <template #header>
        <v-toolbar :flat="true" color="transparent">
          <v-toolbar-title>
            Namespaces
          </v-toolbar-title>
          <v-btn color="primary" prepend-icon="mdi-plus" text="Add" />
        </v-toolbar>
      </template>
      <template #default="{ items }">
        <v-row>
          <v-col v-for="item in items" :key="item.raw.metadata.name" cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-subtitle>Name</v-list-item-subtitle>
                    <v-list-item-title>
                      {{ item.raw.metadata.name }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-subtitle>Status</v-list-item-subtitle>
                    <v-list-item-title>
                      {{ item.raw.status.phase }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-subtitle>Tenant</v-list-item-subtitle>
                    <v-list-item-title>
                      {{ item.raw.metadata.labels["capsule.clastix.io/tenant"] }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { inject, ref } from "vue";

const route = useRoute();

const clusterName = route.params.clusterName;

const loading = ref(true);
const namespaces = ref([]);

const axios: any = inject("axios");

axios.get(`https://${clusterName}.clusters.applicaset.com/api/v1/namespaces`).then((res: any) => {
  namespaces.value = res.data.items;
  loading.value = false;
});
</script>
