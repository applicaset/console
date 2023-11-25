import {ObjectMeta} from "@/types/meta-v1";

type NamespaceSpec = {
  finalizers?: string[]
}

type NamespaceCondition = {}

type NamespaceStatus = {
  conditions: NamespaceCondition[]
  phase: string
}

export type Namespace = {
  apiVersion: 'v1'
  kind: 'Namespace'
  metadata: ObjectMeta
  spec: NamespaceSpec
  readonly status?: NamespaceStatus
}

type PodSpec = {}

type PodStatus = {}

export type Pod = {
  apiVersion: 'v1'
  kind: 'Pod'
  metadata: ObjectMeta
  spec: PodSpec
  readonly status?: PodStatus
}

type ConfigMapSpec = {}

type ConfigMapStatus = {}

export type ConfigMap = {
  apiVersion: 'v1'
  kind: 'ConfigMap'
  metadata: ObjectMeta
  spec: ConfigMapSpec
  readonly status?: ConfigMapStatus
}

type ServiceSpec = {}

type ServiceStatus = {}

export type Service = {
  apiVersion: 'v1'
  kind: 'Service'
  metadata: ObjectMeta
  spec: ServiceSpec
  readonly status?: ServiceStatus
}

type ServiceAccountSpec = {}

type ServiceAccountStatus = {}

export type ServiceAccount = {
  apiVersion: 'v1'
  kind: 'ServiceAccount'
  metadata: ObjectMeta
  spec: ServiceAccountSpec
  readonly status?: ServiceAccountStatus
}

type SecretSpec = {}

type SecretStatus = {}

export type Secret = {
  apiVersion: 'v1'
  kind: 'Secret'
  metadata: ObjectMeta
  spec: SecretSpec
  readonly status?: SecretStatus
}

type PersistentVolumeClaimSpec = {}

type PersistentVolumeClaimStatus = {}

export type PersistentVolumeClaim = {
  apiVersion: 'v1'
  kind: 'PersistentVolumeClaim'
  metadata: ObjectMeta
  spec: PersistentVolumeClaimSpec
  readonly status?: PersistentVolumeClaimStatus
}
