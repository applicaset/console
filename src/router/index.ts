// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Wrapper from "@/components/Wrapper.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Index",
    component: Wrapper,
    redirect: { name: "Clusters" },
    children: [
      {
        path: "clusters",
        name: "Clusters",
        component: Wrapper,
        redirect: { name: "Cluster", params: { clusterName: "ash1" } },
        children: [
          {
            path: "",
            name: "ClustersIndex",
            component: () => import("@/components/ClustersIndex.vue"),
          },
          {
            path: ":clusterName",
            name: "Cluster",
            component: () => import("@/components/Cluster.vue"),
            redirect: { name: "ClusterIndex" },
            children: [
              {
                path: "",
                name: "ClusterIndex",
                component: () => import("@/components/ClusterIndex.vue"),
              },
              {
                path: ":groupVersion/:resourceName",
                name: "ResourcesIndex",
                component: () => import("@/components/ResourcesIndex.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
