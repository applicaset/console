type ObjectMeta = {
  name: string;
  ownerReferences: any[];
};

export type Namespace = {
  apiVersion: "v1";
  kind: "Namespace";
  metadata: ObjectMeta;
  spec: object;
  status: object;
};

export type NamespaceList = {
  items: Namespace[];
};
