import { Axios } from "axios";
import { loadByNamespaceAPIVersionKind } from "@/api/api";

export async function loadOCIRepositories(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    "source.toolkit.fluxcd.io/v1beta2",
    "OCIRepository",
  );
}
