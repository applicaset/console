import { defineStore } from "pinia";
import { Deployment } from "@/types/apps-v1";
import { ObjectMeta } from "@/types/meta-v1";

const getNamespacedList = (state: any) => (
  (clusterName: string, namespaceName: string, apiVersion: string, kind: string) =>
    state.namespacedData[clusterName] &&
    state.namespacedData[clusterName][namespaceName] &&
    state.namespacedData[clusterName][namespaceName][apiVersion] &&
    state.namespacedData[clusterName][namespaceName][apiVersion][kind] || []
);

export const useDataStore = defineStore("data", {
  state: () => ({
    clusters: {} as { [key: string]: string },
    data: {} as { [key: string]: any },
    namespacedData: {} as { [key: string]: any },
    applications: {} as { [key: string]: any }
  }),
  getters: {
    getClusters: (state) => (state.clusters),
    getClusterUrl: (state) => (
      (clusterName: string) => state.clusters[clusterName]
    ),
    getList: (state) => (
      (clusterName: string, apiVersion: string, kind: string) => state.data[clusterName] && state.data[clusterName][apiVersion] && state.data[clusterName][apiVersion][kind] || []
    ),
    getNamespacedList: getNamespacedList,
    getApplicationNames: (state) => {
      // https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
      return (clusterName: string, namespaceName: string): string[] => {
        const deployments = getNamespacedList(state)(clusterName, namespaceName, "apps/v1", "Deployment").filter((deployment: Deployment) => (deployment.metadata.labels && deployment.metadata.labels["app.kubernetes.io/instance"]));
        const statefulSets = getNamespacedList(state)(clusterName, namespaceName, "apps/v1", "StatefulSet").filter((deployment: Deployment) => (deployment.metadata.labels && deployment.metadata.labels["app.kubernetes.io/instance"]));

        return [...deployments, ...statefulSets].map((workload: {
          metadata: ObjectMeta
        }) => workload.metadata.labels && workload.metadata.labels["app.kubernetes.io/instance"] || "").filter((value, index, self) => self.indexOf(value) === index);
      };
    },
    getApplicationWorkloads: (state) => (
      (clusterName: string, namespaceName: string, instance: string) => {
        const deployments = getNamespacedList(state)(clusterName, namespaceName, "apps/v1", "Deployment").filter((deployment: Deployment) => (deployment.metadata.labels && deployment.metadata.labels["app.kubernetes.io/instance"]));
        const statefulSets = getNamespacedList(state)(clusterName, namespaceName, "apps/v1", "StatefulSet").filter((deployment: Deployment) => (deployment.metadata.labels && deployment.metadata.labels["app.kubernetes.io/instance"]));

        return [...deployments, ...statefulSets].filter((workload: {
          metadata: ObjectMeta
        }) => (workload.metadata.labels && workload.metadata.labels["app.kubernetes.io/instance"] === instance));
      }
    )
  },
  actions: {
    setClusters(clusters: { [key: string]: string }) {
      this.clusters = clusters;
    },
    setList(clusterName: string, apiVersion: string, kind: string, value: any) {
      if (!this.data[clusterName]) this.data[clusterName] = {};
      if (!this.data[clusterName][apiVersion]) this.data[clusterName][apiVersion] = {};
      this.data[clusterName][apiVersion][kind] = value;
    },
    setNamespacedList(clusterName: string, namespaceName: string, apiVersion: string, kind: string, value: any) {
      if (!this.namespacedData[clusterName])
        this.namespacedData[clusterName] = {};
      if (!this.namespacedData[clusterName][namespaceName])
        this.namespacedData[clusterName][namespaceName] = {};
      if (!this.namespacedData[clusterName][namespaceName][apiVersion])
        this.namespacedData[clusterName][namespaceName][apiVersion] = {};
      this.namespacedData[clusterName][namespaceName][apiVersion][kind] = value;
    }
  }
});
