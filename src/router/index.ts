import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import Clusters from "@/views/clusters/Index.vue";
import Cluster from "@/views/clusters/cluster/Index.vue";
import Namespaces from "@/views/clusters/cluster/namespaces/Index.vue";

const routes = [
  {
    path: "/",
    component: Index,
    redirect: { name: "Clusters" },
    children: [
      {
        path: "clusters",
        name: "Clusters",
        component: Clusters,
        redirect: { name: "Cluster", params: {clusterName: 'ash1'} },
        children: [
          {
            path: ":clusterName",
            name: "Cluster",
            component: Cluster,
            redirect: { name: "Namespaces" },
            children: [
              {
                path: "namespaces",
                name: "Namespaces",
                component: Namespaces
              }
            ]
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
