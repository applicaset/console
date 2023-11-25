import { Axios } from "axios";
import { deleteByNamespaceAPIVersionKindName, loadByNamespaceAPIVersionKind } from "@/api/api";

export async function loadJobs(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "batch/v1", "Job");
}

export async function deleteJob(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "batch/v1", "Job", name);
}

export async function loadCronJobs(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "batch/v1", "CronJob");
}

export async function deleteCronJob(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "batch/v1", "CronJob", name);
}
