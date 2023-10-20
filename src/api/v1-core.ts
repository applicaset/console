import { ObjectMeta } from 'src/api/v1-meta';
import { api } from 'boot/axios';

type NamespaceSpec = {
  finalizers?: string[];
};

type NamespaceStatus = {
  phase: string;
};

export type Namespace = {
  apiVersion: 'v1';
  kind: 'Namespace';
  metadata: ObjectMeta;
  spec: NamespaceSpec;
  status: NamespaceStatus;
};

export type NamespaceList = {
  items: Namespace[];
};

export async function createNamespace(
  namespace: Partial<Namespace>,
): Promise<Namespace> {
  const res = await api.post('/api/v1/namespaces', namespace);

  return res.data;
}

export async function listNamespaces(): Promise<NamespaceList> {
  const res = await api.get('/api/v1/namespaces');

  return res.data;
}
