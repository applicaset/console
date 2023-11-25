import { Axios } from "axios";
import { deleteByNamespaceAPIVersionKindName, loadByNamespaceAPIVersionKind } from "@/api/api";

export async function loadIngresses(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress");
}

export async function deleteIngress(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress", name);
}
