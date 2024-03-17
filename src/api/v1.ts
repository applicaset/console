import { Axios } from "axios";
import {
  deleteByNamespaceAPIVersionKindName,
  loadByAPIVersionKind,
  loadByNamespaceAPIVersionKind,
  replaceByNamespaceAPIVersionKindName,
} from "@/api/api";
import {
  ConfigMap,
  PersistentVolumeClaim,
  Pod,
  Secret,
  Service,
  ServiceAccount,
} from "@/types/v1";

export async function loadNamespaces(axios: Axios, clusterName: string) {
  await loadByAPIVersionKind(axios, clusterName, "v1", "Namespace");
}

export async function loadResourceQuotas(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ResourceQuota",
  );
}

export async function loadEvents(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Event",
  );
}

export async function loadPods(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Pod",
  );
}

export async function replacePod(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: Pod,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Pod",
    name,
    body,
  );
}

export async function deletePod(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Pod",
    name,
  );
}

export async function loadSecrets(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Secret",
  );
}

export async function replaceSecret(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: Secret,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Secret",
    name,
    body,
  );
}

export async function deleteSecret(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Secret",
    name,
  );
}

export async function loadConfigMaps(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ConfigMap",
  );
}

export async function replaceConfigMap(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: ConfigMap,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ConfigMap",
    name,
    body,
  );
}

export async function deleteConfigMap(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ConfigMap",
    name,
  );
}

export async function loadService(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Service",
  );
}

export async function replaceService(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: Service,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Service",
    name,
    body,
  );
}

export async function deleteService(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "Service",
    name,
  );
}

export async function loadPersistentVolumeClaims(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "PersistentVolumeClaim",
  );
}

export async function replacePersistentVolumeClaim(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: PersistentVolumeClaim,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "PersistentVolumeClaim",
    name,
    body,
  );
}

export async function deletePersistentVolumeClaim(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "PersistentVolumeClaim",
    name,
  );
}

export async function loadServiceAccounts(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ServiceAccount",
  );
}

export async function replaceServiceAccount(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
  body: ServiceAccount,
) {
  await replaceByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ServiceAccount",
    name,
    body,
  );
}

export async function deleteServiceAccount(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  name: string,
) {
  await deleteByNamespaceAPIVersionKindName(
    axios,
    clusterName,
    namespaceName,
    "v1",
    "ServiceAccount",
    name,
  );
}
