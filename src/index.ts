import { loadSwtcFile, mapDefinitionToContainer, onShutdown } from './util';
export { ContainerDefinition, OnStartHook } from './types';

export async function startWithTestContainers(): Promise<void> {
  const swtc = await loadSwtcFile(`${process.cwd()}/swtc.ts`);

  console.log(swtc);

  const containers = swtc?.containers.map(mapDefinitionToContainer) ?? [];

  const instances = await Promise.all(containers.map((container) => container.start()));

  onShutdown(async (signal = 'SHUTDOWN') => {
    console.log(`Received ${signal} shutdown event`);
    await Promise.all(instances.map((instance) => instance.stop()));
  });

  return swtc?.run();
}
