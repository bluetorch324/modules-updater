#!/usr/bin/env node

const program = require('commander');
const { muCreate } = require('./');

//.option('-r, --repo <url>', 'specify github repo to clone from')
//.option('-d, --delete', 'delete project after zip')

program
    .option('-o, --output <path>', 'specify output directory for modules zip')
    .option('--no-install', 'run npm install on project before zip');

program.parse(process.argv);

console.log('modules-updater run mu-create with options:');
//console.log('repo:', program.repo);
//console.log('delete:', Boolean(program.delete));
console.log('output:', program.output);
console.log('install:', program.install);

try {
    muCreate(program);
} catch (err) {
    console.error(`modules-updater ERR! mu-create:`, err);
}