type ManagedFieldsEntry = {}

type OwnerReference = {}

export type ObjectMeta = {
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
