import { Axios } from "axios";
import {
  deleteByNamespaceAPIVersionKindName,
  loadByNamespaceAPIVersionKind,
  replaceByNamespaceAPIVersionKindName
} from "@/api/api";
import { Role, RoleBinding } from "@/types/rbac-authorization-k8s-io-v1";

export async function loadRoles(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "Role");
}

export async function replaceRole(axios: Axios, clusterName: string, namespaceName: string, name: string, body: Role) {
  await replaceByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "Role", name, body);
}

export async function deleteRole(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "Role", name);
}

export async function loadRoleBindings(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding");
}

export async function replaceRoleBinding(axios: Axios, clusterName: string, namespaceName: string, name: string, body: RoleBinding) {
  await replaceByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding", name, body);
}

export async function deleteRoleBinding(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "rbac.authorization.k8s.io/v1", "RoleBinding", name);
}
