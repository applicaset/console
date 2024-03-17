import { defineStore } from "pinia";
import { Deployment } from "@/types/apps-v1";
import { ObjectMeta } from "@/types/meta-v1";

const getNamespacedList =
  (state: any) =>
  (
    clusterName: string,
    namespaceName: string,
    apiVersion: string,
    kind: string,
  ): any[] =>
    (state.namespacedData[clusterName] &&
      state.namespacedData[clusterName][namespaceName] &&
      state.namespacedData[clusterName][namespaceName][apiVersion] &&
      state.namespacedData[clusterName][namespaceName][apiVersion][kind]) ||
    [];

const checkOrSetApiVersion =
  (state: any) => (clusterName: string, apiVersion: string) => {
    state.data[clusterName] = state.data[clusterName] || {};
    state.data[clusterName][apiVersion] =
      state.data[clusterName][apiVersion] || {};
  };

const checkOrSetKind =
  (state: any) => (clusterName: string, apiVersion: string, kind: string) => {
    checkOrSetApiVersion(state)(clusterName, apiVersion);
    state.data[clusterName][apiVersion][kind] =
      state.data[clusterName][apiVersion][kind] || [];
  };

const checkOrSetNamespacedApiVersion =
  (state: any) =>
  (clusterName: string, namespaceName: string, apiVersion: string) => {
    state.namespacedData[clusterName] = state.namespacedData[clusterName] || {};
    state.namespacedData[clusterName][namespaceName] =
      state.namespacedData[clusterName][namespaceName] || {};
    state.namespacedData[clusterName][namespaceName][apiVersion] =
      state.namespacedData[clusterName][namespaceName][apiVersion] || {};
  };

const checkOrSetNamespacedKind =
  (state: any) =>
  (
    clusterName: string,
    namespaceName: string,
    apiVersion: string,
    kind: string,
  ) => {
    checkOrSetNamespacedApiVersion(state)(
      clusterName,
      namespaceName,
      apiVersion,
    );
    state.namespacedData[clusterName][namespaceName][apiVersion][kind] =
      state.namespacedData[clusterName][namespaceName][apiVersion][kind] || [];
  };

export const useDataStore = defineStore("data", {
  state: () => ({
    // clusters is a map of cluster name and cluster url
    clusters: {} as { [clusterName: string]: string },
    // data contains the list of resources by cluster name, api version and kind
    data: {} as {
      [clusterName: string]: {
        [apiVersion: string]: { [kind: string]: any };
      };
    },
    // namespacedData contains the list of namespaced resources by cluster name, namespace name, api version and kind
    namespacedData: {} as {
      [clusterName: string]: {
        [namespaceName: string]: {
          [apiVersion: string]: { [kind: string]: any };
        };
      };
    },
    //
    applications: {} as { [key: string]: any },
  }),
  getters: {
    // getClusters returns list of clusters as an object with cluster name as key and cluster url as value
    getClusters: (state) => state.clusters,
    // getClusterUrl returns the url of the cluster by cluster name
    getClusterUrl: (state) => (clusterName: string) =>
      state.clusters[clusterName],
    // getList returns the list of resources by cluster name, api version and kind
    getList:
      (state) => (clusterName: string, apiVersion: string, kind: string) =>
        (state.data[clusterName] &&
          state.data[clusterName][apiVersion] &&
          state.data[clusterName][apiVersion][kind]) ||
        [],
    // getNamespacedList returns the list of namespaced resources by cluster name, namespace name, api version and kind
    getNamespacedList: getNamespacedList,
    getResource:
      (state) =>
      (
        clusterName: string,
        namespaceName: string,
        apiVersion: string,
        kind: string,
        name: string,
      ) =>
        getNamespacedList(state)(
          clusterName,
          namespaceName,
          apiVersion,
          kind,
        ).find(
          (resource: { metadata: ObjectMeta }) =>
            resource.metadata.name === name,
        ),
    getApplicationNames: (state) => {
      // https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
      return (clusterName: string, namespaceName: string): string[] => {
        const deployments = getNamespacedList(state)(
          clusterName,
          namespaceName,
          "apps/v1",
          "Deployment",
        ).filter(
          (deployment: Deployment) =>
            deployment.metadata.labels &&
            deployment.metadata.labels["app.kubernetes.io/instance"],
        );
        const statefulSets = getNamespacedList(state)(
          clusterName,
          namespaceName,
          "apps/v1",
          "StatefulSet",
        ).filter(
          (deployment: Deployment) =>
            deployment.metadata.labels &&
            deployment.metadata.labels["app.kubernetes.io/instance"],
        );

        return [...deployments, ...statefulSets]
          .map(
            (workload: { metadata: ObjectMeta }) =>
              workload.metadata.labels?.["app.kubernetes.io/instance"] || "",
          )
          .filter((value, index, self) => self.indexOf(value) === index);
      };
    },
    getApplicationWorkloads:
      (state) =>
      (clusterName: string, namespaceName: string, instance: string) => {
        const deployments = getNamespacedList(state)(
          clusterName,
          namespaceName,
          "apps/v1",
          "Deployment",
        ).filter(
          (deployment: Deployment) =>
            deployment.metadata.labels?.["app.kubernetes.io/instance"],
        );
        const statefulSets = getNamespacedList(state)(
          clusterName,
          namespaceName,
          "apps/v1",
          "StatefulSet",
        ).filter(
          (deployment: Deployment) =>
            deployment.metadata.labels?.["app.kubernetes.io/instance"],
        );

        return [...deployments, ...statefulSets].filter(
          (workload: { metadata: ObjectMeta }) =>
            workload.metadata.labels?.["app.kubernetes.io/instance"] ===
            instance,
        );
      },
  },
  actions: {
    setClusters(clusters: { [key: string]: string }) {
      this.clusters = clusters;
    },
    setList(clusterName: string, apiVersion: string, kind: string, value: any) {
      checkOrSetApiVersion(this)(clusterName, apiVersion);

      this.data[clusterName][apiVersion][kind] = value;
    },
    addToList(
      clusterName: string,
      apiVersion: string,
      kind: string,
      value: any,
    ) {
      checkOrSetKind(this)(clusterName, apiVersion, kind);

      this.data[clusterName][apiVersion][kind].push(value);
    },
    removeFromList(
      clusterName: string,
      apiVersion: string,
      kind: string,
      object: { metadata: ObjectMeta },
    ) {
      checkOrSetKind(this)(clusterName, apiVersion, kind);
      // TODO: remove in place
      this.data[clusterName][apiVersion][kind] = this.data[clusterName][
        apiVersion
      ][kind].filter(
        (val: { metadata: ObjectMeta }) =>
          object.metadata.name !== val.metadata.name,
      );
    },
    replaceInList(
      clusterName: string,
      apiVersion: string,
      kind: string,
      object: { metadata: ObjectMeta },
    ) {
      checkOrSetKind(this)(clusterName, apiVersion, kind);

      this.data[clusterName][apiVersion][kind].forEach(
        (val: { metadata: ObjectMeta }, index: string) => {
          if (object.metadata.name === val.metadata.name) {
            this.data[clusterName][apiVersion][kind][index] = object;
          }
        },
      );
    },
    setNamespacedList(
      clusterName: string,
      namespaceName: string,
      apiVersion: string,
      kind: string,
      value: any,
    ) {
      checkOrSetNamespacedApiVersion(this)(
        clusterName,
        namespaceName,
        apiVersion,
      );

      this.namespacedData[clusterName][namespaceName][apiVersion][kind] = value;
    },
    addToNamespacedList(
      clusterName: string,
      namespaceName: string,
      apiVersion: string,
      kind: string,
      value: any,
    ) {
      checkOrSetNamespacedKind(this)(
        clusterName,
        namespaceName,
        apiVersion,
        kind,
      );

      this.namespacedData[clusterName][namespaceName][apiVersion][kind].push(
        value,
      );
    },
    removeFromNamespacedList(
      clusterName: string,
      namespaceName: string,
      apiVersion: string,
      kind: string,
      object: { metadata: ObjectMeta },
    ) {
      checkOrSetNamespacedKind(this)(
        clusterName,
        namespaceName,
        apiVersion,
        kind,
      );
      // TODO: remove in place
      this.namespacedData[clusterName][namespaceName][apiVersion][kind] =
        this.namespacedData[clusterName][namespaceName][apiVersion][
          kind
        ].filter(
          (val: { metadata: ObjectMeta }) =>
            object.metadata.name !== val.metadata.name,
        );
    },
    replaceInNamespacedList(
      clusterName: string,
      namespaceName: string,
      apiVersion: string,
      kind: string,
      object: { metadata: ObjectMeta },
    ) {
      checkOrSetNamespacedKind(this)(
        clusterName,
        namespaceName,
        apiVersion,
        kind,
      );

      this.namespacedData[clusterName][namespaceName][apiVersion][kind].forEach(
        (val: { metadata: ObjectMeta }, index: string) => {
          if (object.metadata.name === val.metadata.name) {
            this.namespacedData[clusterName][namespaceName][apiVersion][kind][
              index
            ] = object;
          }
        },
      );
    },
  },
});
