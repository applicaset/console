import { Axios } from "axios";
import {
  deleteByNamespaceAPIVersionKindName,
  loadByNamespaceAPIVersionKind,
  replaceByNamespaceAPIVersionKindName,
} from "@/api/api";
import { Deployment, StatefulSet } from "@/types/apps-v1";

export async function loadDeployments(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "apps/v1",
    "Deployment",
  );
}

export async function replaceDeployment(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: Deployment,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "apps/v1",
    "Deployment",
    name,
    body,
  );
}

export async function deleteDeployment(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "apps/v1",
    "Deployment",
    name,
  );
}

export async function loadStatefulSets(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "apps/v1",
    "StatefulSet",
  );
}

export async function replaceStatefulSet(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: StatefulSet,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "apps/v1",
    "StatefulSet",
    name,
    body,
  );
}

export async function deleteStatefulSet(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "apps/v1",
    "StatefulSet",
    name,
  );
}
