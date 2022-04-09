#!/usr/bin/env node

import { Command } from 'commander';
import { register } from 'ts-node';
import { startWithTestContainers } from '..';

const program = new Command();

program
  .name('swtc')
  .description(
    'CLI to start a node process with specified Docker containers. Refer to https://github.com/Brad-Turner/swtc for more information.'
  )
  .version(require('../../package.json').version)
  .option('-p, --project <path>', 'Defines the path to SWTC container setup file', 'swtc.ts');

program.parse(process.argv);

register();
startWithTestContainers(program.opts());
