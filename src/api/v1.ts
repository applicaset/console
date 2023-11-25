import { Axios } from "axios";
import { useDataStore } from "@/store/data";
import { deleteByNamespaceAPIVersionKindName, loadByNamespaceAPIVersionKind } from "@/api/api";

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
