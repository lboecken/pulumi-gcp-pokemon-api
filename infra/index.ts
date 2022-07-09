// TODO password pull from pulumi secrets

import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
import * as random from '@pulumi/random';
import CloudSQL from './cloudSQL/index';

const GCP_PROJECT_ID = new pulumi.Config('gcp').requireSecret('project');

const db = new CloudSQL({ name: 'pokemon_api', projectID: GCP_PROJECT_ID });

export const user = db.user;
export const db_instance = db.instance;
export const password = db.password;
