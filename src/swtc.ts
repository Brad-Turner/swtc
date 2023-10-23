import { spawn } from 'node:child_process';
import { type SwtcConfig } from './types.js';
import { onShutdown } from './util.js';

export async function startWithTestContainers(config: SwtcConfig): Promise<void> {
  const containers = config?.containers ?? [];

  if (containers.length) {
    console.info(`Starting ${containers.length} containers...`);

    const instances = await Promise.all(containers.map((container) => container.start()));

    onShutdown(async (signal = 'SHUTDOWN') => {
      console.info(`Received ${signal} shutdown event. Stopping containers...`);
      await Promise.all(instances.map((instance) => instance.stop()));
    });

    console.info('Containers are started and ready');
  }

  // start separate node process with watch
  console.info(config.entrypoint);

  const childProcessArgs = new Array<string>();
  // if (config.envFile) childProcessArgs.push(`--env-file=${config.envFile}`);
  if (config.esm) childProcessArgs.push(`--loader`, `ts-node/esm`);
  if (config.watch) childProcessArgs.push(`--watch`);

  spawn('node', [...childProcessArgs, config.entrypoint], { stdio: 'inherit' });
}
