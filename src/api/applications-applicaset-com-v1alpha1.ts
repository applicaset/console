import { Axios } from "axios";
import {
  createByNamespaceAPIVersionKindName,
  loadByNamespaceAPIVersionKind,
  patchByNamespaceAPIVersionKindName,
} from "@/api/api";
import { useDataStore } from "@/store/data";
import {
  API_VERSION,
  GIT_HUB_INSTALLATION_KIND,
  GitHubInstallation,
} from "@/types/applications-applicaset-com-v1alpha1";

export async function loadGitHubInstallations(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
) {
  await loadByNamespaceAPIVersionKind(
    axios,
    clusterName,
    namespaceName,
    API_VERSION,
    GIT_HUB_INSTALLATION_KIND,
  );
}

export async function upsertGitHubInstallation(
  axios: Axios,
  clusterName: string,
  namespaceName: string,
  installationId: number,
  code: string,
) {
  await loadGitHubInstallations(axios, clusterName, namespaceName);

  const dataStore = useDataStore();
  const gitHubInstallations = dataStore.getNamespacedList(
    clusterName,
    namespaceName,
    API_VERSION,
    GIT_HUB_INSTALLATION_KIND,
  );

  const gitHubInstallation = gitHubInstallations.find(
    (installation) => installation.spec.id === installationId,
  );

  if (gitHubInstallation) {
    await patchByNamespaceAPIVersionKindName(
      axios,
      clusterName,
      namespaceName,
      API_VERSION,
      GIT_HUB_INSTALLATION_KIND,
      gitHubInstallation.metadata.name,
      {
        spec: {
          code,
        },
      },
    );
  } else {
    await createByNamespaceAPIVersionKindName<GitHubInstallation>(
      axios,
      clusterName,
      namespaceName,
      API_VERSION,
      GIT_HUB_INSTALLATION_KIND,
      {
        metadata: {
          name: `github-installation-${installationId}`,
        },
        spec: {
          id: installationId,
          code,
        },
      },
    );
  }
}
