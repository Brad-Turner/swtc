import { type SwtcConfig } from 'swtc';
import { spawn } from 'node:child_process';

const pinoPretty = spawn('npx', ['pino-pretty'], { stdio: ['pipe', process.stdout, process.stderr], shell: true });

const config: SwtcConfig = {
  entrypoint: '<entrypoint>',
  stdio: ['pipe', pinoPretty.stdin, pinoPretty.stdin],
  containers: [
    // container definitions, etc...
  ],
};

export default config;
