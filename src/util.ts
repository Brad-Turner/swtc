import { EventEmitter } from 'events';
import { constants, promises as fs } from 'fs';
import { URL } from 'node:url';

export function onShutdown(handle: (signal?: string) => Promise<void> | void) {
  const events = ['beforeExit', 'SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK'];
  const shutdownEmitter = new EventEmitter().once('shutdown', handle);

  events.forEach((signal) => process.on(signal, (code) => shutdownEmitter.emit('shutdown', code)));
}

export async function loadFile<T>(path: URL): Promise<T | undefined> {
  try {
    await fs.access(path, constants.F_OK);
    const esmPath = path.toString().replace(/\.(c|m)?ts$/, '.$1js');

    const file: T = await import(esmPath.toString());

    // validate here
    return file;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
