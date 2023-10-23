# SWTC - Start with Testcontainers

[![NPM Package Version](https://img.shields.io/npm/v/swtc)](https://www.npmjs.com/package/swtc)
[![CI](https://github.com/Brad-Turner/swtc/actions/workflows/ci.yml/badge.svg)](https://github.com/Brad-Turner/swtc/actions/workflows/ci.yml)
[![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)](https://www.typescriptlang.org/)

A thin wrapper around the [testcontainers](https://github.com/testcontainers/testcontainers-node) library, SWTC lets you easily start and configure a network of Docker services before running a node project.

## Installation

```bash
$ npm install swtc --save-dev
```

## Configuration

After installing SWTC, you will need to create a `.swtc.ts` file. This is the location where you can define what services are required before starting your NodeJS entrypoint.

```ts
import { GenericContainer, type SwtcConfig } from 'swtc';

const config: SwtcConfig = {
  watch: true,
  entrypoint: './server.ts',
  containers: [
    new GenericContainer('mongo').withExposedPorts(27017).onStart((instance) => {
      process.env.DB_URI = `mongodb://${instance.getHost()}:${instance.getMappedPort(27017)}`;
    }),
  ],
};

export default config;
```

## Usage

After a `.swtc.ts` file is configured, you can start your node process with the following command:

```bash
npx swtc
```

## Documentation

Please refer to the [SWTC Documentation](https://brad-turner.github.io/swtc/) for more information about setup and configuration.

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
