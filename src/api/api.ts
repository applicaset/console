import { Namespace, NamespaceList } from 'src/api/types';
import { api } from 'boot/axios';

export async function createNamespace(
  namespace: Partial<Namespace>
): Promise<Namespace> {
  const res = await api.post('/api/v1/namespaces', namespace);

  return res.data;
}

export async function listNamespace(): Promise<NamespaceList> {
  const res = await api.get('/api/v1/namespaces');

  return res.data;
}
