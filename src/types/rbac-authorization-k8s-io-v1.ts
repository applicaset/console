import { ObjectMeta } from "@/types/meta-v1";
import { BaseResource } from "@/types/resource";

type PolicyRule = {};

export type Role = BaseResource & {
  apiVersion: "rbac.authorization.k8s.io/v1";
  kind: "Role";
  rules: PolicyRule[];
};

type RoleRef = {};

type Subject = {};

export type RoleBinding = BaseResource & {
  apiVersion: "rbac.authorization.k8s.io/v1";
  kind: "RoleBinding";
  roleRef: RoleRef;
  subjects: Subject[];
};
