#!/usr/bin/env -S node --loader ts-node/esm

import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import { startWithTestContainers } from '../index.js';

const packageJsonPath = fileURLToPath(new URL('../../package.json', import.meta.url));
const { default: packageJson } = await import(`file://${packageJsonPath}`, { assert: { type: 'json' } });
const program = new Command();

program
  .name('swtc')
  .description(
    'CLI to start a node process with specified Docker containers. Refer to https://github.com/Brad-Turner/swtc for more information.',
  )
  .version(packageJson.version)
  .option('-p, --project <path>', 'Specifies the path to the swtc entypoint file', 'swtc.ts');

program.parse(process.argv);

await startWithTestContainers(program.opts());
