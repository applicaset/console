import { useDataStore } from "@/store/data";
import { Axios } from "axios";

function pluralFromKind(kind: string): string {
  switch (kind) {
    case 'ResourceQuota':
      return 'resourcequotas'
    case 'Event':
      return 'events'
    default:
      return kind
  }
}

async function loadByNamespaceAPIVersionKind(axios: Axios, clusterName: string, namespaceName: string, apiVersion: string, kind: string) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind)

  let url =  `https://${clusterName}.clusters.applicaset.com/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`

  if (apiVersion == 'v1')
    url = `https://${clusterName}.clusters.applicaset.com/api/v1/namespaces/${namespaceName}/${plural}`

  const res = await axios.get(url);

  dataStore.setNamespacedList(clusterName, namespaceName, apiVersion, kind, res.data.items);
}

export async function loadNamespaces(axios: Axios, clusterName: string) {
  const dataStore = useDataStore();

  const res = await axios.get(`https://${clusterName}.clusters.applicaset.com/api/v1/namespaces`);

  dataStore.setList(clusterName, "v1", "Namespace", res.data.items);
}

export async function loadResourceQuotas(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios,clusterName,namespaceName,'v1','ResourceQuota')
}

export async function loadEvents(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios,clusterName,namespaceName,'v1','Event')
}
