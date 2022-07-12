import * as k8s from '@pulumi/kubernetes';
import * as gcp from '@pulumi/gcp';

const engineVersion = gcp.container
  .getEngineVersions()
  .then((res) => res.latestMasterVersion);

const cluster = new gcp.container.Cluster('pokemon_api', {}, {});
