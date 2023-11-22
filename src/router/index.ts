import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import Clusters from "@/views/clusters/Index.vue";
import Cluster from "@/views/clusters/cluster/Index.vue";
import ClusterDashboard from "@/views/clusters/cluster/Dashboard.vue";
import Namespaces from "@/views/clusters/cluster/namespaces/Index.vue";
import NamespacesList from "@/views/clusters/cluster/namespaces/List.vue";
import Namespace from "@/views/clusters/cluster/namespaces/namespace/Index.vue";
import NamespaceDashboard from "@/views/clusters/cluster/namespaces/namespace/Dashboard.vue";
import Applications from "@/views/clusters/cluster/namespaces/namespace/Applications.vue";
import Pods from "@/views/clusters/cluster/namespaces/namespace/Pods.vue";
import Deployments from "@/views/clusters/cluster/namespaces/namespace/Deployments.vue";
import StatefulSets from "@/views/clusters/cluster/namespaces/namespace/StatefulSets.vue";
import ConfigMaps from "@/views/clusters/cluster/namespaces/namespace/ConfigMaps.vue";
import Secrets from "@/views/clusters/cluster/namespaces/namespace/Secrets.vue";
import Services from "@/views/clusters/cluster/namespaces/namespace/Services.vue";
import Ingresses from "@/views/clusters/cluster/namespaces/namespace/Ingresses.vue";
import PersistentVolumeClaims from "@/views/clusters/cluster/namespaces/namespace/PersistentVolumeClaims.vue";
import Events from "@/views/clusters/cluster/namespaces/namespace/Events.vue";
import ServiceAccounts from "@/views/clusters/cluster/namespaces/namespace/ServiceAccounts.vue";
import Roles from "@/views/clusters/cluster/namespaces/namespace/Roles.vue";
import RoleBindings from "@/views/clusters/cluster/namespaces/namespace/RoleBindings.vue";

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
                path: "dashboard",
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
                        path: "dashboard",
                        name: "NamespaceDashboard",
                        component: NamespaceDashboard,
                      },
                      {
                        path: "applications",
                        name: "Applications",
                        component: Applications,
                      },
                      {
                        path: "pods",
                        name: "Pods",
                        component: Pods,
                      },
                      {
                        path: "deployments",
                        name: "Deployments",
                        component: Deployments,
                      },
                      {
                        path: "statefulsets",
                        name: "StatefulSets",
                        component: StatefulSets,
                      },
                      {
                        path: "configmaps",
                        name: "ConfigMaps",
                        component: ConfigMaps,
                      },
                      {
                        path: "secrets",
                        name: "Secrets",
                        component: Secrets,
                      },
                      {
                        path: "services",
                        name: "Services",
                        component: Services,
                      },
                      {
                        path: "ingresses",
                        name: "Ingresses",
                        component: Ingresses,
                      },
                      {
                        path: "persistentvolumeclaims",
                        name: "PersistentVolumeClaims",
                        component: PersistentVolumeClaims,
                      },
                      {
                        path: "events",
                        name: "Events",
                        component: Events,
                      },
                      {
                        path: "serviceaccounts",
                        name: "ServiceAccounts",
                        component: ServiceAccounts,
                      },
                      {
                        path: "roles",
                        name: "Roles",
                        component: Roles,
                      },
                      {
                        path: "rolebindings",
                        name: "RoleBindings",
                        component: RoleBindings,
                      },
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
