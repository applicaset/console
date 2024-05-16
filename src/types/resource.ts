import { ObjectMeta } from "@/types/meta-v1";

export type BaseResource = {
  apiVersion: string;
  kind: string;
  metadata: ObjectMeta;
};
