#!/usr/bin/env node

const program = require('commander');
const { muExtractBackup } = require('..');

try {
    muExtractBackup(program);
} catch (err) {
    console.error(err);
}