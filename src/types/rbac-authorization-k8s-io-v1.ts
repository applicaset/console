import { ObjectMeta } from "@/types/meta-v1";

type PolicyRule = {}

export type Role = {
  apiVersion: 'rbac.authorization.k8s.io/v1'
  kind: 'Role'
  metadata: ObjectMeta
  rules: PolicyRule[]
}

type RoleRef = {}

type Subject = {}

export type RoleBinding = {
  apiVersion: 'rbac.authorization.k8s.io/v1'
  kind: 'RoleBinding'
  metadata: ObjectMeta
  roleRef: RoleRef
  subjects: Subject[]
}
