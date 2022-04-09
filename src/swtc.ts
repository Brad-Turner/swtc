import { GenericContainer } from 'testcontainers';
import { ContainerDefinition, SwtcSettings, SwtcFile } from './types';
import { loadFile, onShutdown, resolveStringToPath } from './util';

function mapDefinitionToContainer(def: ContainerDefinition): GenericContainer {
  const container = new GenericContainer(def.image).withExposedPorts(...def.ports);

  if (def.name) container.withName(def.name);
  if (def.env) {
    Object.entries(def.env).forEach(([key, value]) => container.withEnv(key, value));
  }

  const ref = container.start;
  container.start = async function () {
    const instance = await ref.apply(this);

    if (def.onStart) def.onStart(instance);
    return instance;
  };

  return container;
}

export async function startWithTestContainers(settings: SwtcSettings): Promise<void> {
  const swtcPath = resolveStringToPath(settings.project, 'swtc.ts');
  const swtc = await loadFile<SwtcFile>(swtcPath);

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
