import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import Clusters from "@/views/clusters/Index.vue";
import Cluster from "@/views/clusters/cluster/Index.vue";
import ClusterDashboard from "@/views/clusters/cluster/Dashboard.vue";
import Namespaces from "@/views/clusters/cluster/namespaces/Index.vue";
import NamespacesList from "@/views/clusters/cluster/namespaces/List.vue";
import Namespace from "@/views/clusters/cluster/namespaces/namespace/Index.vue";
import NamespaceDashboard from "@/views/clusters/cluster/namespaces/namespace/Dashboard.vue";
import NamespaceApplications from "@/views/clusters/cluster/namespaces/namespace/Applications.vue";
import NamespaceEvents from "@/views/clusters/cluster/namespaces/namespace/Events.vue";

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
            redirect: { name: "ClusterDashboard" },
            children: [
              {
                path: "",
                name: "ClusterDashboard",
                component: ClusterDashboard,
              },
              {
                path: "namespaces",
                name: "Namespaces",
                component: Namespaces,
                redirect: { name: "NamespacesList" },
                children: [
                  {
                    path: "",
                    name: "NamespacesList",
                    component: NamespacesList
                  },
                  {
                    path: ":namespaceName",
                    name: "Namespace",
                    component: Namespace,
                    redirect: { name: "NamespaceDashboard" },
                    children: [
                      {
                        path: "",
                        name: "NamespaceDashboard",
                        component: NamespaceDashboard,
                      },
                      {
                        path: "applications",
                        name: "NamespaceApplications",
                        component: NamespaceApplications,
                      },
                      {
                        path: "events",
                        name: "NamespaceEvents",
                        component: NamespaceEvents,
                      }
                    ]
                  }
                ]
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
