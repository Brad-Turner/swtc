import { GenericContainer, type SwtcConfig } from 'swtc';

const config: SwtcConfig = {
  entrypoint: '/path/to/your/entrypoint.ts',
  esm: true,
  watch: true,
  containers: [
    new GenericContainer('minio/minio')
      .withExposedPorts(9000, 9001)
      .withCommand(['server', '/data', '--console-address', '0.0.0.0:9001'])
      .withEnvironment({ MINIO_ROOT_USER: '<user>', MINIO_ROOT_PASSWORD: '<password>' })
      .onStart((instance) => {
        process.env.S3_ENDPOINT = `http://${instance.getHost()}:${instance.getMappedPort(9000)}`;
      }),
  ],
};

export default config;
