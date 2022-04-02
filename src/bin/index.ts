#!/usr/bin/env node

require('ts-node').register();
const { startWithTestContainers } = require('..');

startWithTestContainers();
