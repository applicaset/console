import {ObjectMeta} from "@/types/meta-v1";

type StatefulSetSpec = {}

type StatefulSetStatus = {
  availableReplicas: number
  readyReplicas: number
}

export type StatefulSet = {
  apiVersion: "apps/v1"
  kind: "StatefulSet"
  metadata: ObjectMeta
  spec: StatefulSetSpec
  readonly status?: StatefulSetStatus
}

type DeploymentSpec = {}

type DeploymentStatus = {
  availableReplicas: number
  readyReplicas: number
}

export type Deployment = {
  apiVersion: "apps/v1"
  kind: "Deployment"
  metadata: ObjectMeta
  spec: DeploymentSpec
  readonly status?: DeploymentStatus
}
