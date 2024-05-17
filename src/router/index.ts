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
import ApplicationsNew from "@/views/clusters/cluster/namespaces/namespace/applications/new/Index.vue";
import ApplicationsNewManifest from "@/views/clusters/cluster/namespaces/namespace/applications/new/manifest/Index.vue";
import ApplicationsNewGit from "@/views/clusters/cluster/namespaces/namespace/applications/new/git/Index.vue";
import ApplicationsNewGitGithub from "@/views/clusters/cluster/namespaces/namespace/applications/new/git/github/Index.vue";
import ApplicationsNewGitGithubCallback from "@/views/clusters/cluster/namespaces/namespace/applications/new/git/github/Callback.vue";

import Pods from "@/views/clusters/cluster/namespaces/namespace/pods/Index.vue";
import PodsList from "@/views/clusters/cluster/namespaces/namespace/pods/List.vue";
import Pod from "@/views/clusters/cluster/namespaces/namespace/pods/pod/Index.vue";
import PodEdit from "@/views/clusters/cluster/namespaces/namespace/pods/pod/Edit.vue";

import Deployments from "@/views/clusters/cluster/namespaces/namespace/deployments/Index.vue";
import DeploymentsList from "@/views/clusters/cluster/namespaces/namespace/deployments/List.vue";
import Deployment from "@/views/clusters/cluster/namespaces/namespace/deployments/deployment/Index.vue";
import DeploymentEdit from "@/views/clusters/cluster/namespaces/namespace/deployments/deployment/Edit.vue";

import StatefulSets from "@/views/clusters/cluster/namespaces/namespace/statefulsets/Index.vue";
import StatefulSetsList from "@/views/clusters/cluster/namespaces/namespace/statefulsets/List.vue";
import StatefulSet from "@/views/clusters/cluster/namespaces/namespace/statefulsets/statefulset/Index.vue";
import StatefulSetEdit from "@/views/clusters/cluster/namespaces/namespace/statefulsets/statefulset/Edit.vue";

import ConfigMaps from "@/views/clusters/cluster/namespaces/namespace/configmaps/Index.vue";
import ConfigMapsList from "@/views/clusters/cluster/namespaces/namespace/configmaps/List.vue";
import ConfigMap from "@/views/clusters/cluster/namespaces/namespace/configmaps/configmap/Index.vue";
import ConfigMapEdit from "@/views/clusters/cluster/namespaces/namespace/configmaps/configmap/Edit.vue";

import Secrets from "@/views/clusters/cluster/namespaces/namespace/secrets/Index.vue";
import SecretsList from "@/views/clusters/cluster/namespaces/namespace/secrets/List.vue";
import Secret from "@/views/clusters/cluster/namespaces/namespace/secrets/secret/Index.vue";
import SecretEdit from "@/views/clusters/cluster/namespaces/namespace/secrets/secret/Edit.vue";

import Services from "@/views/clusters/cluster/namespaces/namespace/services/Index.vue";
import ServicesList from "@/views/clusters/cluster/namespaces/namespace/services/List.vue";
import Service from "@/views/clusters/cluster/namespaces/namespace/services/service/Index.vue";
import ServiceEdit from "@/views/clusters/cluster/namespaces/namespace/services/service/Edit.vue";

import Ingresses from "@/views/clusters/cluster/namespaces/namespace/ingresses/Index.vue";
import IngressesList from "@/views/clusters/cluster/namespaces/namespace/ingresses/List.vue";
import Ingress from "@/views/clusters/cluster/namespaces/namespace/ingresses/ingress/Index.vue";
import IngressEdit from "@/views/clusters/cluster/namespaces/namespace/ingresses/ingress/Edit.vue";

import PersistentVolumeClaims from "@/views/clusters/cluster/namespaces/namespace/persistentvolumeclaims/Index.vue";
import PersistentVolumeClaimsList from "@/views/clusters/cluster/namespaces/namespace/persistentvolumeclaims/List.vue";
import PersistentVolumeClaim from "@/views/clusters/cluster/namespaces/namespace/persistentvolumeclaims/persistentvolumeclaim/Index.vue";
import PersistentVolumeClaimEdit from "@/views/clusters/cluster/namespaces/namespace/persistentvolumeclaims/persistentvolumeclaim/Edit.vue";

import Events from "@/views/clusters/cluster/namespaces/namespace/Events.vue";

import ServiceAccounts from "@/views/clusters/cluster/namespaces/namespace/serviceaccounts/Index.vue";
import ServiceAccountsList from "@/views/clusters/cluster/namespaces/namespace/serviceaccounts/List.vue";
import ServiceAccount from "@/views/clusters/cluster/namespaces/namespace/serviceaccounts/serviceaccount/Index.vue";
import ServiceAccountEdit from "@/views/clusters/cluster/namespaces/namespace/serviceaccounts/serviceaccount/Edit.vue";

import Roles from "@/views/clusters/cluster/namespaces/namespace/roles/Index.vue";
import RolesList from "@/views/clusters/cluster/namespaces/namespace/roles/List.vue";
import Role from "@/views/clusters/cluster/namespaces/namespace/roles/role/Index.vue";
import RoleEdit from "@/views/clusters/cluster/namespaces/namespace/roles/role/Edit.vue";

import RoleBindings from "@/views/clusters/cluster/namespaces/namespace/rolebindings/Index.vue";
import RoleBindingsList from "@/views/clusters/cluster/namespaces/namespace/rolebindings/List.vue";
import RoleBinding from "@/views/clusters/cluster/namespaces/namespace/rolebindings/rolebinding/Index.vue";
import RoleBindingEdit from "@/views/clusters/cluster/namespaces/namespace/rolebindings/rolebinding/Edit.vue";

import Jobs from "@/views/clusters/cluster/namespaces/namespace/jobs/Index.vue";
import JobsList from "@/views/clusters/cluster/namespaces/namespace/jobs/List.vue";
import Job from "@/views/clusters/cluster/namespaces/namespace/jobs/job/Index.vue";
import JobEdit from "@/views/clusters/cluster/namespaces/namespace/jobs/job/Edit.vue";

import CronJobs from "@/views/clusters/cluster/namespaces/namespace/cronjobs/Index.vue";
import CronJobsList from "@/views/clusters/cluster/namespaces/namespace/cronjobs/List.vue";
import CronJob from "@/views/clusters/cluster/namespaces/namespace/cronjobs/cronjob/Index.vue";
import CronJobEdit from "@/views/clusters/cluster/namespaces/namespace/cronjobs/cronjob/Edit.vue";
import { useDataStore } from "@/store/data";
import { useNotificationsStore } from "@/store/notifications";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: { title: "Home" },
    redirect: { name: "Clusters" },
    children: [
      {
        path: "clusters",
        name: "Clusters",
        component: Clusters,
        meta: { title: "Clusters" },
        redirect: { name: "ClustersList" },
        children: [
          {
            path: "",
            name: "ClustersList",
            component: ClustersList,
            meta: { hideCrumb: true },
          },
          {
            path: ":clusterName",
            name: "Cluster",
            component: Cluster,
            meta: { title: "Cluster A" },
            redirect: { name: "ClusterDashboard" },
            children: [
              {
                path: "dashboard",
                name: "ClusterDashboard",
                component: ClusterDashboard,
                meta: { title: "Cluster Dashboard" },
              },
              {
                path: "namespaces",
                name: "Namespaces",
                component: Namespaces,
                meta: { title: "Namespaces" },
                redirect: { name: "NamespacesList" },
                children: [
                  {
                    path: "",
                    name: "NamespacesList",
                    component: NamespacesList,
                    meta: { hideCrumb: true },
                  },
                  {
                    path: ":namespaceName",
                    name: "Namespace",
                    component: Namespace,
                    meta: { title: "Namespace A" },
                    redirect: { name: "NamespaceDashboard" },
                    children: [
                      {
                        path: "dashboard",
                        name: "NamespaceDashboard",
                        component: NamespaceDashboard,
                        meta: { title: "Namespace Dashboard" },
                      },
                      {
                        path: "applications",
                        name: "Applications",
                        component: Applications,
                        redirect: { name: "ApplicationsList" },
                        children: [
                          {
                            path: "",
                            name: "ApplicationsList",
                            meta: { hideCrumb: true },
                            component: ApplicationsList,
                          },
                          {
                            path: "new",
                            name: "ApplicationsNew",
                            meta: { title: "New Application" },
                            component: ApplicationsNew,
                          },
                          {
                            path: "new/git",
                            name: "ApplicationsNewGit",
                            meta: { title: "New Git Application" },
                            component: ApplicationsNewGit,
                          },
                          {
                            path: "new/git/github",
                            name: "ApplicationsNewGitGithub",
                            meta: { title: "New GitHub Application" },
                            component: ApplicationsNewGitGithub,
                          },
                          {
                            path: "new/git/github/callback",
                            name: "ApplicationsNewGitGithubCallback",
                            meta: { title: "New GitHub Application Callback" },
                            component: ApplicationsNewGitGithubCallback,
                          },
                          {
                            path: "new/manifest",
                            name: "ApplicationsNewManifest",
                            meta: { title: "New Application from Manifest" },
                            component: ApplicationsNewManifest,
                          },
                        ],
                      },
                      {
                        path: "pods",
                        name: "Pods",
                        component: Pods,
                        redirect: { name: "PodsList" },
                        children: [
                          {
                            path: "",
                            name: "PodsList",
                            meta: { hideCrumb: true },
                            component: PodsList,
                          },
                          {
                            path: ":podName",
                            name: "Pod",
                            component: Pod,
                            children: [
                              {
                                path: "edit",
                                name: "PodEdit",
                                component: PodEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "deployments",
                        name: "Deployments",
                        component: Deployments,
                        redirect: { name: "DeploymentsList" },
                        children: [
                          {
                            path: "",
                            name: "DeploymentsList",
                            meta: { hideCrumb: true },
                            component: DeploymentsList,
                          },
                          {
                            path: ":deploymentName",
                            name: "Deployment",
                            component: Deployment,
                            children: [
                              {
                                path: "edit",
                                name: "DeploymentEdit",
                                component: DeploymentEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "statefulsets",
                        name: "StatefulSets",
                        component: StatefulSets,
                        redirect: { name: "StatefulSetsList" },
                        children: [
                          {
                            path: "",
                            name: "StatefulSetsList",
                            meta: { hideCrumb: true },
                            component: StatefulSetsList,
                          },
                          {
                            path: ":statefulSetName",
                            name: "StatefulSet",
                            component: StatefulSet,
                            children: [
                              {
                                path: "edit",
                                name: "StatefulSetEdit",
                                component: StatefulSetEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "jobs",
                        name: "Jobs",
                        component: Jobs,
                        redirect: { name: "JobsList" },
                        children: [
                          {
                            path: "",
                            name: "JobsList",
                            meta: { hideCrumb: true },
                            component: JobsList,
                          },
                          {
                            path: ":jobName",
                            name: "Job",
                            component: Job,
                            children: [
                              {
                                path: "edit",
                                name: "JobEdit",
                                component: JobEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "cronjobs",
                        name: "CronJobs",
                        component: CronJobs,
                        redirect: { name: "CronJobsList" },
                        children: [
                          {
                            path: "",
                            name: "CronJobsList",
                            meta: { hideCrumb: true },
                            component: CronJobsList,
                          },
                          {
                            path: ":cronJobName",
                            name: "CronJob",
                            component: CronJob,
                            children: [
                              {
                                path: "edit",
                                name: "CronJobEdit",
                                component: CronJobEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "configmaps",
                        name: "ConfigMaps",
                        component: ConfigMaps,
                        redirect: { name: "ConfigMapsList" },
                        children: [
                          {
                            path: "",
                            name: "ConfigMapsList",
                            meta: { hideCrumb: true },
                            component: ConfigMapsList,
                          },
                          {
                            path: ":configMapName",
                            name: "ConfigMap",
                            component: ConfigMap,
                            children: [
                              {
                                path: "edit",
                                name: "ConfigMapEdit",
                                component: ConfigMapEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "secrets",
                        name: "Secrets",
                        component: Secrets,
                        redirect: { name: "SecretsList" },
                        children: [
                          {
                            path: "",
                            name: "SecretsList",
                            meta: { hideCrumb: true },
                            component: SecretsList,
                          },
                          {
                            path: ":secretName",
                            name: "Secret",
                            component: Secret,
                            children: [
                              {
                                path: "edit",
                                name: "SecretEdit",
                                component: SecretEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "services",
                        name: "Services",
                        component: Services,
                        redirect: { name: "ServicesList" },
                        children: [
                          {
                            path: "",
                            name: "ServicesList",
                            meta: { hideCrumb: true },
                            component: ServicesList,
                          },
                          {
                            path: ":serviceName",
                            name: "Service",
                            component: Service,
                            children: [
                              {
                                path: "edit",
                                name: "ServiceEdit",
                                component: ServiceEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "ingresses",
                        name: "Ingresses",
                        component: Ingresses,
                        redirect: { name: "IngressesList" },
                        children: [
                          {
                            path: "",
                            name: "IngressesList",
                            meta: { hideCrumb: true },
                            component: IngressesList,
                          },
                          {
                            path: ":ingressName",
                            name: "Ingress",
                            component: Ingress,
                            children: [
                              {
                                path: "edit",
                                name: "IngressEdit",
                                component: IngressEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "persistentvolumeclaims",
                        name: "PersistentVolumeClaims",
                        component: PersistentVolumeClaims,
                        redirect: { name: "PersistentVolumeClaimsList" },
                        children: [
                          {
                            path: "",
                            name: "PersistentVolumeClaimsList",
                            meta: { hideCrumb: true },
                            component: PersistentVolumeClaimsList,
                          },
                          {
                            path: ":persistentVolumeClaimName",
                            name: "PersistentVolumeClaim",
                            component: PersistentVolumeClaim,
                            children: [
                              {
                                path: "edit",
                                name: "PersistentVolumeClaimEdit",
                                component: PersistentVolumeClaimEdit,
                              },
                            ],
                          },
                        ],
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
                        redirect: { name: "ServiceAccountsList" },
                        children: [
                          {
                            path: "",
                            name: "ServiceAccountsList",
                            meta: { hideCrumb: true },
                            component: ServiceAccountsList,
                          },
                          {
                            path: ":serviceAccountName",
                            name: "ServiceAccount",
                            component: ServiceAccount,
                            children: [
                              {
                                path: "edit",
                                name: "ServiceAccountEdit",
                                component: ServiceAccountEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "roles",
                        name: "Roles",
                        component: Roles,
                        redirect: { name: "RolesList" },
                        children: [
                          {
                            path: "",
                            name: "RolesList",
                            meta: { hideCrumb: true },
                            component: RolesList,
                          },
                          {
                            path: ":roleName",
                            name: "Role",
                            component: Role,
                            children: [
                              {
                                path: "edit",
                                name: "RoleEdit",
                                component: RoleEdit,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: "rolebindings",
                        name: "RoleBindings",
                        component: RoleBindings,
                        redirect: { name: "RoleBindingsList" },
                        children: [
                          {
                            path: "",
                            name: "RoleBindingsList",
                            meta: { hideCrumb: true },
                            component: RoleBindingsList,
                          },
                          {
                            path: ":roleBindingName",
                            name: "RoleBinding",
                            component: RoleBinding,
                            children: [
                              {
                                path: "edit",
                                name: "RoleBindingEdit",
                                component: RoleBindingEdit,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
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

router.beforeEach((to, from, next) => {
  const notificationsStore = useNotificationsStore();

  if (to.params.clusterName === "current") {
    notificationsStore.addInfo("Switching to current cluster");
    const dataStore = useDataStore();

    const currentClusterName = dataStore.getCurrentClusterName;

    if (currentClusterName) {
      to.params.clusterName = currentClusterName;

      if (to.params.namespaceName === "current") {
        notificationsStore.addInfo("Switching to current namespace");
        const currentNamespaceName = dataStore.getCurrentNamespaceName;

        if (currentNamespaceName) {
          to.params.namespaceName = currentNamespaceName;
        } else {
          notificationsStore.addError("No current namespace");
          next({
            name: "NamespacesList",
            params: { clusterName: currentClusterName },
          });

          return;
        }
      }
    } else {
      next({ name: "Clusters" });

      return;
    }

    next(to);
  }

  next();
});

export default router;
