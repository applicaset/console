// Utilities
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    data: {} as { [key: string]: any },
    namespacedData: {} as { [key: string]: any }
  }),
  getters: {
    getList: (state) => (
      (clusterName: string, apiVersion: string, kind: string) => state.data[clusterName] && state.data[clusterName][apiVersion] && state.data[clusterName][apiVersion][kind] || []
    ),
    getNamespacedList: (state) => (
      (clusterName: string, namespaceName: string, apiVersion: string, kind: string) =>
        state.namespacedData[clusterName] &&
        state.namespacedData[clusterName][namespaceName] &&
        state.namespacedData[clusterName][namespaceName][apiVersion] &&
        state.namespacedData[clusterName][namespaceName][apiVersion][kind] || []
    )
  },
  actions: {
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
