import { Namespace } from 'src/types';
import { api } from 'boot/axios';

export async function createNamespace(
  namespace: Partial<Namespace>
): Promise<Namespace> {
  const res = await api.post('/api/v1/namespaces', namespace);

  return res.data;
}
