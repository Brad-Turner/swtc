import { S3Client } from '@aws-sdk/client-s3';
import { ContainerDefinition, StartedTestContainer } from 'swtc';

export const containers: ContainerDefinition[] = [
  {
    image: 'minio/minio',
    ports: [9000, 9001],
    withCommand: ['server', '/data', '--console-address', '0.0.0.0:9001'],
    env: {
      MINIO_ROOT_USER: '<user>',
      MINIO_ROOT_PASSWORD: '<password>'
    },
    onStart: (instance: StartedTestContainer) => {
      process.env.AWS_ENDPOINT = `http://${instance.getHost()}:${instance.getMappedPort(9000)}`;
    }
  }
];

export const run = async (): Promise<void> => {
  const client = new S3Client({ region: 'us-west-1', endpoint: process.env.AWS_ENDPOINT });

  // Do stuff ...
};
