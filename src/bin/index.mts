#!/usr/bin/env -S node --loader ts-node/esm

import { Command } from 'commander';
import assert from 'node:assert';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isGenericContainer } from '../generic-container.js';
import { startWithTestContainers } from '../index.js';
import { type SwtcConfig } from '../types.js';
import { loadFile } from '../util.js';

const packageJsonPath = fileURLToPath(new URL('../../package.json', import.meta.url));
const { default: packageJson } = await import(`file://${packageJsonPath}`, { assert: { type: 'json' } });
const program = new Command();

program
  .name('swtc')
  .description(
    'CLI to start a node process with specified Docker containers. Refer to https://github.com/Brad-Turner/swtc for more information.',
  )
  .version(packageJson.version)
  .option('--esm', 'Enables loading ecmascript modules')
  .option('-p, --project <path>', 'Specifies the path to the swtc entypoint file', './.swtc.ts');
// .option('--env-file', 'Specifies the path to an env file to be loaded');

program.parse(process.argv);

const options = program.opts();
const swtcPath = pathToFileURL(options.project);
const swtcFile = await loadFile(swtcPath);

assert(swtcFile.default && typeof swtcFile.default === 'object');
const swtcConfig = swtcFile.default;

assert('entrypoint' in swtcConfig);
assert(typeof swtcConfig.entrypoint === 'string');

if ('containers' in swtcFile) {
  assert(Array.isArray(swtcFile.containers));
  assert(swtcFile.containers.every(isGenericContainer));
}

await startWithTestContainers(swtcConfig as SwtcConfig);
