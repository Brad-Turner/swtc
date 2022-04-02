import { StartedTestContainer } from 'testcontainers';

export type OnStartHook = (container: StartedTestContainer) => void;

export interface ContainerDefinition {
  image: string;
  ports: number[];
  name?: string;
  env?: Record<string, string>;
  onStart?: OnStartHook;
}

export interface SwtcFile {
  containers: ContainerDefinition[];
  run: () => Promise<void>;
}
