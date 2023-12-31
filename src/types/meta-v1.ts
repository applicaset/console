// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/

type ManagedFieldsEntry = {};

type OwnerReference = {};

export type ObjectMeta = {
  annotations?: { [key: string]: string };
  readonly creationTimestamp?: string;
  readonly deletionGracePeriodSeconds?: number;
  readonly deletionTimestamp?: string;
  finalizers?: string[];
  generateName?: string;
  readonly generation?: number;
  labels?: { [key: string]: string };
  managedFields?: ManagedFieldsEntry[];
  name: string;
  namespace?: string;
  ownerReferences?: OwnerReference[];
  readonly resourceVersion?: string;
  selfLink?: string;
  readonly uid?: string;
};

export type Time = string;
