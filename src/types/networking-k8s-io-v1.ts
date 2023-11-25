import { ObjectMeta } from "@/types/meta-v1";

type IngressSpec = {}

type IngressStatus = {}

export type Ingress = {
  apiVersion: 'networking.k8s.io/v1'
  kind: 'Ingress'
  metadata: ObjectMeta
  spec: IngressSpec
  readonly status?: IngressStatus
}
