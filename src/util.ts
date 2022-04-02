import { EventEmitter } from 'events';
import { constants, PathLike, promises as fs } from 'fs';
import { GenericContainer } from 'testcontainers';
import { ContainerDefinition, SwtcFile } from './types';

export function onShutdown(handle: (signal?: string) => Promise<void> | void) {
  const events = ['beforeExit', 'SIGINT', 'SIGTERM'];
  const shutdownEmitter = new EventEmitter().once('shutdown', handle);

  events.forEach((signal) => {
    process.once(signal, (code) => shutdownEmitter.emit('shutdown', code));
  });
}

export async function loadSwtcFile(path: PathLike): Promise<SwtcFile | undefined> {
  try {
    await fs.access(path, constants.F_OK);

    const file: SwtcFile = await import(path.toString());

    // validate here
    return file;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function mapDefinitionToContainer(def: ContainerDefinition): GenericContainer {
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
