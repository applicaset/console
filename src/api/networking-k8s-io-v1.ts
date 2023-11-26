import { Axios } from "axios";
import {
  deleteByNamespaceAPIVersionKindName,
  loadByNamespaceAPIVersionKind,
  replaceByNamespaceAPIVersionKindName
} from "@/api/api";
import { Ingress } from "@/types/networking-k8s-io-v1";

export async function loadIngresses(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress");
}

export async function replaceIngress(axios: Axios, clusterName: string, namespaceName: string, name: string, body: Ingress) {
  await replaceByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress", name, body);
}

export async function deleteIngress(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "networking.k8s.io/v1", "Ingress", name);
}
