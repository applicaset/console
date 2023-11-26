import { Axios } from "axios";
import { createByAPIVersionKind } from "@/api/api";
import { ResourceAttributes, SelfSubjectAccessReview } from "@/types/authorization-k8s-io-v1";

export async function createSelfSubjectAccessReview(axios: Axios, clusterName: string, body: SelfSubjectAccessReview): Promise<SelfSubjectAccessReview> {
  return await createByAPIVersionKind(axios, clusterName, "authorization.k8s.io/v1", "SelfSubjectAccessReview", body);
}

export async function canI(axios: Axios, clusterName: string, resourceAttributes: Partial<ResourceAttributes>): Promise<boolean> {
  const req = {
    apiVersion: "authorization.k8s.io/v1",
    kind: "SelfSubjectAccessReview",
    spec: {
      resourceAttributes: resourceAttributes
    }
  } as SelfSubjectAccessReview;

  const res = await createSelfSubjectAccessReview(axios, clusterName, req);

  return res.status.allowed
}
