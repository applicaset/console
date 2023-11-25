import {ObjectMeta} from "@/types/meta-v1";

type JobSpec = {}

type JobStatus = {}

export type Job = {
  apiVersion: "batch/v1"
  kind: "Job"
  metadata: ObjectMeta
  spec: JobSpec
  readonly status?: JobStatus
}

type CronJobSpec = {}

type CronJobStatus = {
  availableReplicas: number
  readyReplicas: number
}

export type CronJob = {
  apiVersion: "batch/v1"
  kind: "CronJob"
  metadata: ObjectMeta
  spec: CronJobSpec
  readonly status?: CronJobStatus
}
