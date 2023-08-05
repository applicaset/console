type OwnerReference = {
  name: string;
};

type ObjectMeta = {
  name: string;
  ownerReferences?: OwnerReference[];
};

type NamespaceSpec = {};

type NamespaceStatus = {
  phase: string;
};

export type Namespace = {
  apiVersion: 'v1';
  kind: 'Namespace';
  metadata: ObjectMeta;
  spec: NamespaceSpec;
  status: NamespaceStatus;
};

export type NamespaceList = {
  items: Namespace[];
};
