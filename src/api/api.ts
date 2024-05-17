import { useDataStore } from "@/store/data";
import { Axios } from "axios";
import { BaseResource } from "@/types/resource";
import { useNotificationsStore } from "@/store/notifications";

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

  const url =
    apiVersion == "v1"
      ? `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}`
      : `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  const res = await axios.get(url);

  dataStore.setNamespacedList(
    clusterName,
    namespaceName,
    apiVersion,
    kind,
    res.data.items,
  );

  // watch for changes
  await watchByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    apiVersion,
    kind,
    res.data.metadata.resourceVersion,
  );
}

async function watchByNamespaceAPIVersionKind(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
  resourceVersion: string,
) {
  const dataStore = useDataStore();
  const notificationsStore = useNotificationsStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  const url =
    apiVersion == "v1"
      ? `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}`
      : `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  const timeoutSeconds = 50; // less than 60 seconds

  fetch(
    `${url}?resourceVersion=${resourceVersion}&watch=true&timeoutSeconds=${timeoutSeconds}`,
    {
      headers: {
        //@ts-ignore
        Authorization: axios.defaults.headers["Authorization"],
      },
    },
  ).then((response) => {
    if (response.ok && response.body) {
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      const readStream = (): Promise<any> =>
        reader.read().then(({ value, done }) => {
          if (done) {
            reader.cancel();

            watchByNamespaceAPIVersionKind(
              axios,
              clusterName,
              namespaceName,
              apiVersion,
              kind,
              resourceVersion,
            );

            return Promise.resolve();
          }

          // parse the data
          const data = /{.*}/.exec(value);
          if (!data || !data[0]) {
            return readStream();
          }

          const res = JSON.parse(data[0]);

          switch (res.type) {
            case "ADDED":
              dataStore.addToNamespacedList(
                clusterName,
                namespaceName,
                apiVersion,
                kind,
                res.object,
              );

              break;
            case "DELETED":
              dataStore.removeFromNamespacedList(
                clusterName,
                namespaceName,
                apiVersion,
                kind,
                res.object,
              );

              break;
            case "MODIFIED":
              dataStore.replaceInNamespacedList(
                clusterName,
                namespaceName,
                apiVersion,
                kind,
                res.object,
              );

              break;
            default:
              notificationsStore.addWarning(res);
          }

          resourceVersion = res.object.metadata.resourceVersion;

          // do something if success
          // and cancel the stream
          // reader.cancel().catch(() => null);

          return readStream();
        });
      return readStream();
    } else {
      return Promise.reject();
    }
  });
}

export async function loadByAPIVersionKind(
  axios: Axios,
  clusterName: string,
  apiVersion: string,
  kind: string,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  const url =
    apiVersion == "v1"
      ? `${clusterUrl}/api/v1/${plural}`
      : `${clusterUrl}/apis/${apiVersion}/${plural}`;

  const res = await axios.get(url);

  dataStore.setList(clusterName, apiVersion, kind, res.data.items);

  // watch for changes
  await watchByAPIVersionKind(
    axios,
    clusterName,
    apiVersion,
    kind,
    res.data.metadata.resourceVersion,
  );
}

async function watchByAPIVersionKind(
  axios: Axios,
  clusterName: string,
  apiVersion: string,
  kind: string,
  resourceVersion: string,
) {
  const dataStore = useDataStore();
  const notificationsStore = useNotificationsStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  const url =
    apiVersion == "v1"
      ? `${clusterUrl}/api/v1/${plural}`
      : `${clusterUrl}/apis/${apiVersion}/${plural}`;

  const timeoutSeconds = 50; // less than 60 seconds

  fetch(
    `${url}?resourceVersion=${resourceVersion}&watch=true&timeoutSeconds=${timeoutSeconds}`,
    {
      headers: {
        //@ts-ignore
        Authorization: axios.defaults.headers["Authorization"],
      },
    },
  ).then((response) => {
    if (response.ok && response.body) {
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      const readStream = (): Promise<any> =>
        reader.read().then(({ value, done }) => {
          if (done) {
            reader.cancel();

            watchByAPIVersionKind(
              axios,
              clusterName,
              apiVersion,
              kind,
              resourceVersion,
            );

            return Promise.resolve();
          }

          // parse the data
          const data = /{.*}/.exec(value);
          if (!data || !data[0]) {
            return readStream();
          }

          const res = JSON.parse(data[0]);

          switch (res.type) {
            case "ADDED":
              dataStore.addToList(clusterName, apiVersion, kind, res.object);

              break;
            case "DELETED":
              dataStore.removeFromList(
                clusterName,
                apiVersion,
                kind,
                res.object,
              );

              break;
            case "MODIFIED":
              dataStore.replaceInList(
                clusterName,
                apiVersion,
                kind,
                res.object,
              );

              break;
            default:
              notificationsStore.addWarning(res);
          }

          resourceVersion = res.object.metadata.resourceVersion;

          // do something if success
          // and cancel the stream
          // reader.cancel().catch(() => null);

          return readStream();
        });
      return readStream();
    } else {
      return Promise.reject();
    }
  });
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

export async function createByNamespaceAPIVersionKindName<
  T extends BaseResource,
>(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  apiVersion: string,
  kind: string,
  body: Partial<T>,
  dryRun: boolean = false,
) {
  const dataStore = useDataStore();

  const plural = pluralFromKind(kind);

  const clusterUrl = dataStore.getClusterUrl(clusterName);

  let url = `${clusterUrl}/apis/${apiVersion}/namespaces/${namespaceName}/${plural}`;

  if (apiVersion == "v1")
    url = `${clusterUrl}/api/v1/namespaces/${namespaceName}/${plural}`;

  if (dryRun) {
    url += "?dryRun=All";
  }

  body.kind = kind;
  body.apiVersion = apiVersion;

  await axios.post(url, body);
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

  await axios.patch(url, body, {
    headers: {
      "Content-Type": "application/merge-patch+json",
    },
  });
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
}
