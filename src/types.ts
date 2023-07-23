type ObjectMeta = {
  name: string;
};

export type Namespace = {
  apiVersion: "v1";
  kind: "Namespace";
  metadata: ObjectMeta;
  spec: object;
};

export type NamespaceList = {
  items: Namespace[];
};
