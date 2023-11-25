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

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}`;

  const res = await axios.get(url);

  dataStore.setNamespacedList(clusterName, namespaceName, apiVersion, kind, res.data.items);
}

async function deleteByNamespaceAPIVersionKindName(axios: Axios, clusterName: string, namespaceName: string, apiVersion: string, kind: string, name: string) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}/${name}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}/${name}`;

  const res = await axios.delete(url);

  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, apiVersion, kind);
}

export async function loadNamespaces(axios: Axios, clusterName: string) {
  const dataStore = useDataStore();

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  const res = await axios.get(`${clusterUrl}/api/v1/namespaces`);

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

export async function deletePod(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "v1", "Pod", name);
}

export async function loadDeployments(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "apps/v1", "Deployment");
}

export async function deleteDeployment(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "apps/v1", "Deployment", name);
}

export async function loadStatefulSets(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "apps/v1", "StatefulSet");
}

export async function deleteStatefulSet(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "apps/v1", "StatefulSet", name);
}

export async function loadDaemonSets(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "apps/v1", "DaemonSet");
}

export async function deleteDaemonSet(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "apps/v1", "StatefulSet", name);
}

export async function loadSecrets(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "Secret");
}

export async function deleteSecret(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "v1", "Secret", name);
}

export async function loadConfigMaps(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "ConfigMap");
}

export async function deleteConfigMap(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "v1", "ConfigMap", name);
}

export async function loadService(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "Service");
}

export async function deleteService(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "v1", "Service", name);
}

export async function loadIngresses(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress");
}

export async function deleteIngress(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress", name);
}

export async function loadPersistentVolumeClaims(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "PersistentVolumeClaim");
}

export async function deletePersistentVolumeClaim(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "v1", "PersistentVolumeClaim", name);
}

export async function loadServiceAccounts(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "v1", "ServiceAccount");
}

export async function deleteServiceAccount(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "v1", "ServiceAccount", name);
}

export async function loadRoles(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "Role");
}

export async function deleteRole(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "Role", name);
}

export async function loadRoleBindings(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding");
}

export async function deleteRoleBinding(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding", name);
}
