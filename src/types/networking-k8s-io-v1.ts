import { ObjectMeta } from "@/types/meta-v1";
import { BaseResource } from "@/types/resource";

type IngressSpec = {};

type IngressStatus = {};

export type Ingress = BaseResource & {
  apiVersion: "networking.k8s.io/v1";
  kind: "Ingress";
  spec: IngressSpec;
  readonly status?: IngressStatus;
};
