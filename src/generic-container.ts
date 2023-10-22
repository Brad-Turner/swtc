import { GenericContainer as TCGenericContainer, type StartedTestContainer } from 'testcontainers';
import { type SyncOrAsyncHook } from './types.js';

export function isGenericContainer(value: unknown): value is GenericContainer {
  return value instanceof GenericContainer || value instanceof TCGenericContainer;
}

export class GenericContainer extends TCGenericContainer {
  private postStartHook?: SyncOrAsyncHook<[StartedTestContainer]> = undefined;

  public async start(): Promise<StartedTestContainer> {
    const startedContainer = await super.start();
    await this.postStartHook?.(startedContainer);
    return startedContainer;
  }

  public onStart(hook: SyncOrAsyncHook<[StartedTestContainer]>) {
    this.postStartHook = hook;
    return this;
  }
}
