import { Axios } from "axios";
import {
  deleteByNamespaceAPIVersionKindName,
  loadByNamespaceAPIVersionKind,
  replaceByNamespaceAPIVersionKindName
} from "@/api/api";
import { CronJob, Job } from "@/types/batch-v1";

export async function loadJobs(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "batch/v1", "Job");
}

export async function replaceJob(axios: Axios, clusterName: string, namespaceName: string, name: string, body: Job) {
  await replaceByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "batch/v1", "Job", name, body);
}

export async function deleteJob(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "batch/v1", "Job", name);
}

export async function loadCronJobs(axios: Axios, clusterName: string, namespaceName: string) {
  await loadByNamespaceAPIVersionKind(axios, clusterName, namespaceName, "batch/v1", "CronJob");
}

export async function replaceCronJob(axios: Axios, clusterName: string, namespaceName: string, name: string, body: CronJob) {
  await replaceByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "batch/v1", "CronJob", name, body);
}

export async function deleteCronJob(axios: Axios, clusterName: string, namespaceName: string, name: string) {
  await deleteByNamespaceAPIVersionKindName(axios, clusterName, namespaceName, "batch/v1", "CronJob", name);
}
