#!/usr/bin/env node

const program = require('commander');
const {create} = require('./');

program
    .option('-r, --repo <url>', 'specify github repo to clone from')
    .option('-i, --no-install', 'run npm install on project before zip')
    .option('-d', '--delete', 'erase project after zip')
    .option('-o', '--output <path>', 'zip output directory');

program.parse(process.argv);

create(program);