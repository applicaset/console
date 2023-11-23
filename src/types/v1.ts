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
