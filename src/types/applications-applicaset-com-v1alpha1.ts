import { ObjectMeta } from "@/types/meta-v1";
import { BaseResource } from "@/types/resource";

export const API_VERSION = "applications.applicaset.com/v1alpha1";
export const GIT_HUB_INSTALLATION_KIND = "GitHubInstallation";

type GitHubInstallationSpec = {
  id: number;
  code: string;
};

type GitHubInstallationStatus = {
  availableReplicas: number;
  readyReplicas: number;
};

export type GitHubInstallation = BaseResource & {
  apiVersion: "applications.applicaset.com/v1alpha1";
  kind: "GitHubInstallation";
  spec: GitHubInstallationSpec;
  readonly status?: GitHubInstallationStatus;
};
