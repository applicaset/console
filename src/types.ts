type OwnerReference = {
  name: string;
};

type ObjectMeta = {
  name: string;
  ownerReferences?: OwnerReference[];
};

export type Namespace = {
  apiVersion: 'v1';
  kind: 'Namespace';
  metadata: ObjectMeta;
  spec: object;
  status: object;
};

export type NamespaceList = {
  items: Namespace[];
};
