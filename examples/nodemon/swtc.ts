import cp from 'child_process';
import nodemon from 'nodemon';
import path from 'path';
import { ContainerDefinition, StartedTestContainer } from 'swtc';

export const containers: ContainerDefinition[] = [
  {
    image: 'mongo',
    ports: [27017],
    env: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: 'admin'
    },
    onStart: (instance: StartedTestContainer) => {
      process.env.DATABASE_CONNECTION_STRING = `mongodb://${instance.getHost()}:${instance.getMappedPort(27017)}`;
    }
  }
];

export const run = async (): Promise<void> => {
  const entrypoint = path.resolve(__dirname, 'src/index.ts');

  nodemon({ script: entrypoint, stdout: false })
    .on('restart', function (this: any) {
      console.log('RESTART');
    })
    .on('readable', function (this: any) {
      const pino = cp.spawn('npx', ['pino-pretty'], { stdio: ['pipe', process.stdout, process.stderr], shell: true });
      this.stdout.pipe(pino.stdin);
      this.stderr.pipe(pino.stdin);
    });
};
