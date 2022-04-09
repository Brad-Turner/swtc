# SWTC

[![CI](https://github.com/Brad-Turner/swtc/actions/workflows/ci.yml/badge.svg)](https://github.com/Brad-Turner/swtc/actions/workflows/ci.yml) [![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://www.typescriptlang.org/)

Built on top of the [testcontainers](https://github.com/testcontainers/testcontainers-node) library, SWTC (`start with testcontainers`) allows you to run a NodeJS process without the need for worring about Docker container setup or teardown.

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

export const run = async (): Promise<void> => {
  // Code to be run while containers are running
};
```

Please refer to the [API Documentation](https://brad-turner.github.io/swtc/) for more detailed infomation.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
1. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
1. Push to the Branch (`git push origin feature/AmazingFeature`)
1. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.md` for more information.
