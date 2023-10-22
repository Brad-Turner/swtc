import { type GenericContainer } from './generic-container.js';

export type SyncOrAsyncHook<TParams extends unknown[], TOut = void> = (...parameters: TParams) => Promise<TOut> | TOut;

export interface SwtcConfig {
  entrypoint: string;
  containers?: GenericContainer[];
  watch?: boolean;
  esm?: boolean;
  // envFile?: string;
}
