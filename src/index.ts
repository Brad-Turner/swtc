export { StartedTestContainer } from 'testcontainers';
export { ContainerDefinition, OnStartHook } from './types';

import { loadSwtcFile, mapDefinitionToContainer, onShutdown } from './util';

export async function startWithTestContainers(): Promise<void> {
  const swtc = await loadSwtcFile(`${process.cwd()}/swtc.ts`);

  const containers = swtc?.containers.map(mapDefinitionToContainer) ?? [];

  console.log('Starting containers...');

  const instances = await Promise.all(containers.map((container) => container.start()));

  onShutdown(async (signal = 'SHUTDOWN') => {
    console.log(`Received ${signal} shutdown event. Stopping containers...`);
    await Promise.all(instances.map((instance) => instance.stop()));
  });

  console.log('Containers are started and ready');

  return swtc?.run();
}
