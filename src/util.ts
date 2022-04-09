import { EventEmitter } from 'events';
import { constants, PathLike, promises as fs } from 'fs';
import { isAbsolute, resolve } from 'path';

export function onShutdown(handle: (signal?: string) => Promise<void> | void) {
  const events = ['beforeExit', 'SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK'];
  const shutdownEmitter = new EventEmitter().once('shutdown', handle);

  events.forEach((signal) => process.on(signal, (code) => shutdownEmitter.emit('shutdown', code)));
}

export function resolveStringToPath(path: string | undefined, defaultPath: string): PathLike {
  if (!path) path = defaultPath;

  return isAbsolute(path) ? path : resolve(process.cwd(), path);
}

export async function loadFile<T>(path: PathLike): Promise<T | undefined> {
  try {
    await fs.access(path, constants.F_OK);

    const file: T = await import(path.toString());

    // validate here
    return file;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
