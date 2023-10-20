export type OwnerReference = {
  name: string;
};

export type ObjectMeta = {
  name: string;
  ownerReferences?: OwnerReference[];
};
