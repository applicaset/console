import { createRouter, createWebHistory } from "vue-router";

import Index from "@/views/Index.vue";

import Clusters from "@/views/clusters/Index.vue";
import ClustersList from "@/views/clusters/List.vue";
import Cluster from "@/views/clusters/cluster/Index.vue";
import ClusterDashboard from "@/views/clusters/cluster/Dashboard.vue";

import Namespaces from "@/views/clusters/cluster/namespaces/Index.vue";
import NamespacesList from "@/views/clusters/cluster/namespaces/List.vue";
import Namespace from "@/views/clusters/cluster/namespaces/namespace/Index.vue";
import NamespaceDashboard from "@/views/clusters/cluster/namespaces/namespace/Dashboard.vue";

import Applications from "@/views/clusters/cluster/namespaces/namespace/applications/Index.vue";
import ApplicationsList from "@/views/clusters/cluster/namespaces/namespace/applications/List.vue";

import Pods from "@/views/clusters/cluster/namespaces/namespace/pods/Index.vue";
import PodsList from "@/views/clusters/cluster/namespaces/namespace/pods/List.vue";

import Deployments from "@/views/clusters/cluster/namespaces/namespace/deployments/Index.vue";
import DeploymentsList from "@/views/clusters/cluster/namespaces/namespace/deployments/List.vue";

import StatefulSets from "@/views/clusters/cluster/namespaces/namespace/statefulsets/Index.vue";
import StatefulSetsList from "@/views/clusters/cluster/namespaces/namespace/statefulsets/List.vue";

import ConfigMaps from "@/views/clusters/cluster/namespaces/namespace/configmaps/Index.vue";
import ConfigMapsList from "@/views/clusters/cluster/namespaces/namespace/configmaps/List.vue";

import Secrets from "@/views/clusters/cluster/namespaces/namespace/secrets/Index.vue";
import SecretsList from "@/views/clusters/cluster/namespaces/namespace/secrets/List.vue";

import Services from "@/views/clusters/cluster/namespaces/namespace/services/Index.vue";
import ServicesList from "@/views/clusters/cluster/namespaces/namespace/services/List.vue";

import Ingresses from "@/views/clusters/cluster/namespaces/namespace/ingresses/Index.vue";
import IngressesList from "@/views/clusters/cluster/namespaces/namespace/ingresses/List.vue";

import PersistentVolumeClaims from "@/views/clusters/cluster/namespaces/namespace/persistentvolumeclaims/Index.vue";
import PersistentVolumeClaimsList from "@/views/clusters/cluster/namespaces/namespace/persistentvolumeclaims/List.vue";

import Events from "@/views/clusters/cluster/namespaces/namespace/Events.vue";

import ServiceAccounts from "@/views/clusters/cluster/namespaces/namespace/serviceaccounts/Index.vue";
import ServiceAccountsList from "@/views/clusters/cluster/namespaces/namespace/serviceaccounts/List.vue";

import Roles from "@/views/clusters/cluster/namespaces/namespace/roles/Index.vue";
import RolesList from "@/views/clusters/cluster/namespaces/namespace/roles/List.vue";

import RoleBindings from "@/views/clusters/cluster/namespaces/namespace/rolebindings/Index.vue";
import RoleBindingsList from "@/views/clusters/cluster/namespaces/namespace/rolebindings/List.vue";

import Jobs from "@/views/clusters/cluster/namespaces/namespace/jobs/Index.vue";
import JobsList from "@/views/clusters/cluster/namespaces/namespace/jobs/List.vue";

import CronJobs from "@/views/clusters/cluster/namespaces/namespace/cronjobs/Index.vue";
import CronJobsList from "@/views/clusters/cluster/namespaces/namespace/cronjobs/List.vue";

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
        redirect: { name: "ClustersList" },
        children: [
          {
            path: "",
            name: "ClustersList",
            component: ClustersList
          },
          {
            path: ":clusterName",
            name: "Cluster",
            component: Cluster,
            redirect: { name: "ClusterDashboard" },
            children: [
              {
                path: "dashboard",
                name: "ClusterDashboard",
                component: ClusterDashboard
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
                        component: NamespaceDashboard
                      },
                      {
                        path: "applications",
                        name: "Applications",
                        component: Applications,
                        redirect: {name: "ApplicationsList"},
                        children: [
                          {
                            path: "",
                            name: "ApplicationsList",
                            component: ApplicationsList
                          }
                        ]
                      },
                      {
                        path: "pods",
                        name: "Pods",
                        component: Pods,
                        redirect: {name: "PodsList"},
                        children: [
                          {
                            path: "",
                            name: "PodsList",
                            component: PodsList
                          }
                        ]
                      },
                      {
                        path: "deployments",
                        name: "Deployments",
                        component: Deployments,
                        redirect: {name: "DeploymentsList"},
                        children: [
                          {
                            path: "",
                            name: "DeploymentsList",
                            component: DeploymentsList
                          }
                        ]
                      },
                      {
                        path: "statefulsets",
                        name: "StatefulSets",
                        component: StatefulSets,
                        redirect: {name: "StatefulSetsList"},
                        children: [
                          {
                            path: "",
                            name: "StatefulSetsList",
                            component: StatefulSetsList
                          }
                        ]
                      },
                      {
                        path: "jobs",
                        name: "Jobs",
                        component: Jobs,
                        redirect: {name: "JobsList"},
                        children: [
                          {
                            path: "",
                            name: "JobsList",
                            component: JobsList
                          }
                        ]
                      },
                      {
                        path: "cronjobs",
                        name: "CronJobs",
                        component: CronJobs,
                        redirect: {name: "CronJobsList"},
                        children: [
                          {
                            path: "",
                            name: "CronJobsList",
                            component: CronJobsList
                          }
                        ]
                      },
                      {
                        path: "configmaps",
                        name: "ConfigMaps",
                        component: ConfigMaps,
                        redirect: {name: "ConfigMapsList"},
                        children: [
                          {
                            path: "",
                            name: "ConfigMapsList",
                            component: ConfigMapsList
                          }
                        ]
                      },
                      {
                        path: "secrets",
                        name: "Secrets",
                        component: Secrets,
                        redirect: {name: "SecretsList"},
                        children: [
                          {
                            path: "",
                            name: "SecretsList",
                            component: SecretsList
                          }
                        ]
                      },
                      {
                        path: "services",
                        name: "Services",
                        component: Services,
                        redirect: {name: "ServicesList"},
                        children: [
                          {
                            path: "",
                            name: "ServicesList",
                            component: ServicesList
                          }
                        ]
                      },
                      {
                        path: "ingresses",
                        name: "Ingresses",
                        component: Ingresses,
                        redirect: {name: "IngressesList"},
                        children: [
                          {
                            path: "",
                            name: "IngressesList",
                            component: IngressesList
                          }
                        ]
                      },
                      {
                        path: "persistentvolumeclaims",
                        name: "PersistentVolumeClaims",
                        component: PersistentVolumeClaims,
                        redirect: {name: "PersistentVolumeClaimsList"},
                        children: [
                          {
                            path: "",
                            name: "PersistentVolumeClaimsList",
                            component: PersistentVolumeClaimsList
                          }
                        ]
                      },
                      {
                        path: "events",
                        name: "Events",
                        component: Events
                      },
                      {
                        path: "serviceaccounts",
                        name: "ServiceAccounts",
                        component: ServiceAccounts,
                        redirect: {name: "ServiceAccountsList"},
                        children: [
                          {
                            path: "",
                            name: "ServiceAccountsList",
                            component: ServiceAccountsList
                          }
                        ]
                      },
                      {
                        path: "roles",
                        name: "Roles",
                        component: Roles,
                        redirect: {name: "RolesList"},
                        children: [
                          {
                            path: "",
                            name: "RolesList",
                            component: RolesList
                          }
                        ]
                      },
                      {
                        path: "rolebindings",
                        name: "RoleBindings",
                        component: RoleBindings,
                        redirect: {name: "RoleBindingsList"},
                        children: [
                          {
                            path: "",
                            name: "RoleBindingsList",
                            component: RoleBindingsList
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
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
