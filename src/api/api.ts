import { useDataStore } from "@/store/data";
import { Axios } from "axios";

function pluralFromKind(kind: string): string {
  switch (kind) {
    case "Ingress":
      return "ingresses";
    default:
      return kind.toLowerCase() + "s";
  }
}

async function loadByNamespaceAPIVersionKind(axios: Axios, clusterName: string, namespaceName: string, apiVersion: string, kind: string) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  let url = `https://${clusterName}.clusters.applicaset.com/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  if (apiVersion == "v1")
    url = `https://${clusterName}.clusters.applicaset.com/api/v1/namespaces/${namespaceName}/${plural}`;

  const res = await axios.get(url);

  dataStore.setNamespacedList(clusterName, namespaceName, apiVersion, kind, res.data.items);
}

export async function loadNamespaces(axios: Axios, clusterName: string) {
  const dataStore = useDataStore();

  const res = await axios.get(`https://${clusterName}.clusters.applicaset.com/api/v1/namespaces`);

  dataStore.setList(clusterName, "v1", "Namespace", res.data.items);
}

export async function loadResourceQuotas(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "ResourceQuota");
}

export async function loadEvents(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "Event");
}

export async function loadPods(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "Pod");
}

export async function loadDeployments(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "apps/v1", "Deployment");
}

export async function loadStatefulSets(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "apps/v1", "StatefulSet");
}

export async function loadDaemonSets(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "apps/v1", "DaemonSet");
}

export async function loadSecrets(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "Secret");
}

export async function loadConfigMaps(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "ConfigMap");
}

export async function loadService(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "Service");
}

export async function loadIngresses(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress");
}

export async function loadPersistentVolumeClaims(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "PersistentVolumeClaim");
}

export async function loadServiceAccounts(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "ServiceAccount");
}

export async function loadRoles(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "Role");
}

export async function loadRoleBindings(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding");
}
