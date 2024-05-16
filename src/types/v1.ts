import { ObjectMeta, Time } from "@/types/meta-v1";
import { BaseResource } from "@/types/resource";

type NamespaceSpec = {
  finalizers?: string[];
};

type NamespaceCondition = {};

type NamespaceStatus = {
  conditions: NamespaceCondition[];
  phase: string;
};

export type Namespace = BaseResource & {
  apiVersion: "v1";
  kind: "Namespace";
  spec: NamespaceSpec;
  readonly status?: NamespaceStatus;
};

type PodSpec = {};

type ContainerStateRunning = {};
type ContainerStateTerminated = {};
type ContainerStateWaiting = {};

type ContainerState = {
  running: ContainerStateRunning;
  terminated: ContainerStateTerminated;
  waiting: ContainerStateWaiting;
};

export type ContainerStatus = {
  state: ContainerState;
};

export type PodStatus = {
  containerStatuses: ContainerStatus[];
  ephemeralContainerStatuses: ContainerStatus[];
  initContainerStatuses: ContainerStatus[];
  phase: "Pending" | "Running" | "Succeeded" | "Failed" | "Unknown";
};

export type Pod = BaseResource & {
  apiVersion: "v1";
  kind: "Pod";
  spec: PodSpec;
  readonly status?: PodStatus;
};

type ConfigMapSpec = {};

type ConfigMapStatus = {};

export type ConfigMap = BaseResource & {
  apiVersion: "v1";
  kind: "ConfigMap";
  spec: ConfigMapSpec;
  readonly status?: ConfigMapStatus;
};

type ServiceSpec = {};

type ServiceStatus = {};

export type Service = BaseResource & {
  apiVersion: "v1";
  kind: "Service";
  spec: ServiceSpec;
  readonly status?: ServiceStatus;
};

type ServiceAccountSpec = {};

type ServiceAccountStatus = {};

export type ServiceAccount = BaseResource & {
  apiVersion: "v1";
  kind: "ServiceAccount";
  spec: ServiceAccountSpec;
  readonly status?: ServiceAccountStatus;
};

type SecretSpec = {};

type SecretStatus = {};

export type Secret = BaseResource & {
  apiVersion: "v1";
  kind: "Secret";
  spec: SecretSpec;
  readonly status?: SecretStatus;
};

type PersistentVolumeClaimSpec = {};

type PersistentVolumeClaimStatus = {};

export type PersistentVolumeClaim = BaseResource & {
  apiVersion: "v1";
  kind: "PersistentVolumeClaim";
  spec: PersistentVolumeClaimSpec;
  readonly status?: PersistentVolumeClaimStatus;
};

export type ObjectReference = {
  apiVersion: string;
  fieldPath: string;
  kind: string;
  name: string;
  namespace: string;
  resourceVersion: string;
  uid: string;
};

export type Event = BaseResource & {
  apiVersion: "v1";
  kind: "Event";
  action: string;
  involvedObject: ObjectReference;
  lastTimestamp: Time;
  message: string;
  reason: string;
  type: string;
};
