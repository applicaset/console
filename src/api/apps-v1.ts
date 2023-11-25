import { Axios } from "axios";
import { deleteByNamespaceAPIVersionKindName, loadByNamespaceAPIVersionKind } from "@/api/api";

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
