import { ObjectMeta, Time } from "@/types/meta-v1";
import { ObjectReference } from "@/types/v1";
import { BaseResource } from "@/types/resource";

type JobSpec = {
  completions: number;
};

type JobCondition = {};

type UncountedTerminatedPods = {};

type JobStatus = {
  active: number;
  completedIndexes: string;
  completionTime: Time;
  conditions: JobCondition[];
  failed: number;
  failedIndexes: string;
  ready: number;
  startTime: Time;
  succeeded: number;
  terminating: number;
  uncountedTerminatedPods: UncountedTerminatedPods;
};

export type Job = BaseResource & {
  apiVersion: "batch/v1";
  kind: "Job";
  spec: JobSpec;
  readonly status?: JobStatus;
};

type CronJobSpec = {};

type CronJobStatus = {
  active: ObjectReference[];
  lastScheduleTime: Time;
  lastSuccessfulTime: Time;
};

export type CronJob = BaseResource & {
  apiVersion: "batch/v1";
  kind: "CronJob";
  spec: CronJobSpec;
  readonly status?: CronJobStatus;
};
