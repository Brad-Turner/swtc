import { EventEmitter } from 'node:events';
import { constants, promises as fs } from 'node:fs';
import { URL } from 'node:url';
import { type SyncOrAsyncHook } from './types.js';

export function onShutdown(handle: SyncOrAsyncHook<[string]>) {
  const events = ['beforeExit', 'SIGINT', 'SIGTERM', 'SIGHUP', 'SIGBREAK'];
  const shutdownEmitter = new EventEmitter().once('shutdown', handle);

  events.forEach((signal) => process.on(signal, (code) => shutdownEmitter.emit('shutdown', code)));
}

export async function loadFile(path: URL): Promise<Record<string, unknown>> {
  await fs.access(path, constants.F_OK);
  const esmPath = path.toString().replace(/\.(c|m)?ts$/, '.$1js');

  const file = await import(esmPath.toString());
  return file;
}
