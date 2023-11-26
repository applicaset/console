import { ObjectMeta } from "@/types/meta-v1";

type NonResourceAttributes = {
  path: string;
  verb: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

export type ResourceAttributes = {
  group: string | "*";
  name: string | "";
  namespace: string | "";
  resource: string | "*";
  subresource: string | "";
  verb:
    | "get"
    | "list"
    | "watch"
    | "create"
    | "update"
    | "delete"
    | "proxy"
    | "*";
  version: string | "*";
};

type SelfSubjectAccessReviewSpec = {
  nonResourceAttributes: NonResourceAttributes;
  resourceAttributes: ResourceAttributes;
};

type SelfSubjectAccessReviewStatus = {
  allowed: boolean;
  denied?: boolean;
  evaluationError?: string;
  reason?: string;
};

export type SelfSubjectAccessReview = {
  apiVersion: "authorization.k8s.io/v1";
  kind: "SelfSubjectAccessReview";
  metadata: ObjectMeta;
  spec: SelfSubjectAccessReviewSpec;
  readonly status: SelfSubjectAccessReviewStatus;
};
