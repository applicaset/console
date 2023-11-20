type ManagedFieldsEntry = {}

type OwnerReference = {}

type ObjectMeta = {
  annotations?: {}
  readonly creationTimestamp?: string
  readonly deletionGracePeriodSeconds?: number
  readonly deletionTimestamp?: string
  finalizers?: string[]
  generateName?: string
  readonly generation?: number
  labels?: {}
  managedFields?: ManagedFieldsEntry[]
  name: string
  namespace?: string
  ownerReferences?: OwnerReference[]
  readonly resourceVersion?: string
  selfLink?: string
  readonly uid?: string
}

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
