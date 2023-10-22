import { GenericContainer } from 'testcontainers';
import { ContainerDefinition, SwtcSettings, SwtcFile } from './types/index.js';
import { loadFile, onShutdown } from './util.js';
import { pathToFileURL } from 'node:url';

function mapDefinitionToContainer(def: ContainerDefinition): GenericContainer {
  const container = new GenericContainer(def.image).withExposedPorts(...def.ports);

  if (def.name) container.withName(def.name);
  if (def.env) container.withEnvironment(def.env);
  if (Array.isArray(def.withCommand)) container.withCommand(def.withCommand);

  // const ref = container.start;
  // container.start = async function () {
  //   const instance = await ref.apply(this);

  //   if (def.onStart) await def.onStart(instance);
  //   return instance;
  // };

  return container;
}

export async function startWithTestContainers(settings: SwtcSettings = {}): Promise<void> {
  const swtcPath = pathToFileURL(settings.project ?? './swtc.ts');
  const swtc = await loadFile<SwtcFile>(swtcPath);

  const containers = swtc?.containers.map((def) => mapDefinitionToContainer(def)) ?? [];

  console.log('Starting containers...');

  const instances = await Promise.all(containers.map((container) => container.start()));

  onShutdown(async (signal = 'SHUTDOWN') => {
    console.log(`Received ${signal} shutdown event. Stopping containers...`);
    await Promise.all(instances.map((instance) => instance.stop()));
  });

  console.log('Containers are started and ready');

  return swtc?.run();
}
