# SWTC

Built on top of the [testcontainers](https://github.com/testcontainers/testcontainers-node) library, SWTC (`start with testcontainers`) allows you to run a NodeJS process without the need for worring about container setup or teardown.

## Getting Started

### Installation

SWTC is installable through npm

```bash
npm i swtc --save-dev
```

## Usage

SWTC supports local configuration files. This file is named `swtc.ts` and is expected to be in the current working directory. SWTC expects two named exports to be in its configuration file, those are `containers`, and `run`.

```ts
import { ContainerDefinition, StartedTestContainer } from 'swtc';

export const containers: ContainerDefinition[] = [
  {
    image: 'mongo',
    ports: [27017],
    onStart: (instance: StartedTestContainer) => {
      process.env.DATABASE_CONNECTION_STRING = `mongodb://${instance.getHost()}:${instance.getMappedPort(27017)}`;
    }
  }
];

export const run(): Promise<void> {
  // Code to be run while containers are running
}
```
