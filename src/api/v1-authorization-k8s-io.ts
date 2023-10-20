import { ObjectMeta } from 'src/api/v1-meta';
import { api } from 'boot/axios';

type ResourceAttributes = {
  namespace: string;
  resource: string;
  verb: string;
};

type SelfSubjectAccessReviewSpec = {
  resourceAttributes: ResourceAttributes;
};

type SelfSubjectAccessReviewStatus = {
  allowed: boolean;
};

type SelfSubjectAccessReview = {
  apiVersion: 'authorization.k8s.io/v1';
  kind: 'SelfSubjectAccessReview';
  metadata: ObjectMeta;
  spec: SelfSubjectAccessReviewSpec;
  status: SelfSubjectAccessReviewStatus;
};

export async function canI(verb: string, resource: string): Promise<boolean> {
  const res = await api.post(
    '/apis/authorization.k8s.io/v1/selfsubjectaccessreviews',
    {
      spec: {
        resourceAttributes: {
          namespace: 'default',
          verb,
          resource,
        },
      },
    } as SelfSubjectAccessReview,
  );

  return res.data.status.allowed;
}
