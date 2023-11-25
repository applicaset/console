import { Axios } from "axios";
import { deleteByNamespaceAPIVersionKindName, loadByNamespaceAPIVersionKind } from "@/api/api";

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
