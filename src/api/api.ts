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

export async function loadByNamespaceAPIVersionKind(axios: Axios, clusterName: string, namespaceName: string, apiVersion: string, kind: string) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}`;

  const res = await axios.get(url);

  dataStore.setNamespacedList(clusterName, namespaceName, apiVersion, kind, res.data.items);
}

export async function deleteByNamespaceAPIVersionKindName(axios: Axios, clusterName: string, namespaceName: string, apiVersion: string, kind: string, name: string) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}/${name}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}/${name}`;

  await axios.delete(url);

  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, apiVersion, kind);
}
