import { BaseResource } from "@/types/resource";

type OCIRepositorySpec = {
  interval: string;
  provider: "generic" | "aws" | "azure" | "gcp";
  ref: {
    tag: string;
  };
  timeout: string;
  url: string;
};

type OCIRepositoryStatus = {};

export type OCIRepository = BaseResource & {
  apiVersion: "source.toolkit.fluxcd.io/v1beta2";
  kind: "OCIRepository";
  spec: OCIRepositorySpec;
  readonly status?: OCIRepositoryStatus;
};
