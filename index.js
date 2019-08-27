#!/usr/bin/env node

const { add } = require('node-7z');
const { path7za } = require('7zip-bin');
const program = require('commander');
const fs = require('fs');
const git = require('simple-git/promise');
const { execSync } = require('child_process');
const path = require('path');

const files = ['package.json', 'package-lock.json'];

program
    .option('-r, --repo <url>', 'specify github repo to clone from')
    .option('-i, --install', 'run npm install on project before zip', true)
    .option('-d', '--delete', 'erase project after zip', false);

program.parse(process.argv);

const fileExists = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                console.error('modules-updater ERR! with fs', err);
                return reject(err);
            }

            resolve(); // file exists
        })
    });
}

const validRepo = () => {
    files.forEach(async (file) => {
        const exists = await fileExists(file);

        if (!exists) return false;
    });

    return fs.existsSync('node_modules');
}

const sevenAdd = (archive, source, options) => {
    return new Promise((resolve, reject) => {
        const stream = add(archive, source, {
            ...options,
            $bin: path7za
        });

        stream.on('end', resolve());
        stream.on('error', (err) => reject(err));
    });
}

const main = async ({ repo, install, delete: deleteAfter }) => {
    if (repo) {
        await git().silent(true).clone(remote);
    }

    // check that the repo has all required files/folders
    if (!validRepo()) {
        console.error('modules-updater ERR! repo does not have all of the required files:', ...files, 'or node_modules directory');
        process.exit(1);
    }

    // run npm install
    execSync('npm install');

    // create node_modules_backup.7z
    await sevenAdd('node_modules_backup', 'node_modules', {
        recursive: true,
    })

    const dirName = path.basename(process.cwd());

    await sevenAdd(`${dirName}-${Date.now()}`, [...files, 'node_modules_backup.7z']);
}

main(program);