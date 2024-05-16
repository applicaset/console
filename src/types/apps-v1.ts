import { ObjectMeta } from "@/types/meta-v1";
import { BaseResource } from "@/types/resource";

type StatefulSetSpec = {};

type StatefulSetStatus = {
  availableReplicas: number;
  readyReplicas: number;
};

export type StatefulSet = BaseResource & {
  apiVersion: "apps/v1";
  kind: "StatefulSet";
  spec: StatefulSetSpec;
  readonly status?: StatefulSetStatus;
};

type DeploymentSpec = {};

type DeploymentStatus = {
  availableReplicas: number;
  readyReplicas: number;
};

export type Deployment = BaseResource & {
  apiVersion: "apps/v1";
  kind: "Deployment";
  spec: DeploymentSpec;
  readonly status?: DeploymentStatus;
};
