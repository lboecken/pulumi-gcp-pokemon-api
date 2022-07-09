import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';
import * as random from '@pulumi/random';
import {
  ComponentResource,
  CustomResourceOptions,
  Output,
} from '@pulumi/pulumi';
import { DatabaseInstance, User } from '@pulumi/gcp/sql';

interface IcloudSQL {
  name: string;
  projectID: Output<string>;
}

class CloudSQL extends ComponentResource {
  public readonly password: Output<string>;
  public readonly instance: DatabaseInstance;
  public readonly user: User;

  constructor(
    { name, projectID }: IcloudSQL,
    opts: CustomResourceOptions = {}
  ) {
    super('CloudSqlComponent', name, undefined, opts);

    this.instance = new gcp.sql.DatabaseInstance(
      `db-instance`,
      {
        databaseVersion: 'POSTGRES_14',
        project: projectID,
        settings: {
          tier: 'db-f1-micro',
          availabilityType: 'ZONAL',
          diskAutoresize: false,
          diskSize: 10,
        },
      },
      { parent: this }
    );

    const dbPassword = new random.RandomPassword(
      `${name}/password`,
      {
        length: 16,
      },
      { parent: this }
    );
    this.password = dbPassword.result;

    this.user = new gcp.sql.User(
      `${name}/user`,
      {
        name,
        instance: this.instance.name,
        password: this.password,
      },
      { parent: this }
    );

    this.registerOutputs({ password: this.password });
  }
}

export default CloudSQL;
