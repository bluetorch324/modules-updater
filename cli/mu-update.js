#!/usr/bin/env node

const program = require('commander');
const { muUpdate } = require('..');

program
    .option('-m, --modules <path>', 'specify path to modules zip');

program.parse(process.argv);

console.log('modules-updater run mu-update with options:');
console.log('modules:', program.modules);

try {
    muUpdate(program);
} catch (err) {
    console.error(err);
}