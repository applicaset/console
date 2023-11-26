import { useDataStore } from "@/store/data";
import { Axios } from "axios";

export function pluralFromKind(kind: string): string {
  switch (kind) {
    case "Ingress":
      return "ingresses";
    default:
      return kind.toLowerCase() + "s";
  }
}

export async function loadByNamespaceAPIVersionKind(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}`;

  const res = await axios.get(url);

  dataStore.setNamespacedList(
    clusterName,
    namespaceName,
    apiVersion,
    kind,
    res.data.items,
  );
}

export async function createByAPIVersionKind(
  axios: Axios,
  clusterName: string,
  apiVersion: string,
  kind: string,
  body: any,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/${plural}`;

  if (apiVersion == "v1") url = `${clusterUrl}/api/v1/${plural}`;

  const res = await axios.post(url, body);

  return res.data;
}

export async function createByNamespaceAPIVersionKindName(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
  name: string,
  body: any,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}/${name}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}/${name}`;

  await axios.post(url, body);

  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    apiVersion,
    kind,
  );
}

export async function patchByNamespaceAPIVersionKindName(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
  name: string,
  body: any,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}/${name}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}/${name}`;

  await axios.patch(url, body);

  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    apiVersion,
    kind,
  );
}

export async function replaceByNamespaceAPIVersionKindName(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
  name: string,
  body: any,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}/${name}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}/${name}`;

  await axios.put(url, body);

  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    apiVersion,
    kind,
  );
}

export async function deleteByNamespaceAPIVersionKindName(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
  name: string,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}/${name}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}/${name}`;

  await axios.delete(url);

  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    apiVersion,
    kind,
  );
}
