const fs = require('fs');
const path = require('path');
const git = require('simple-git/promise');
const { execSync } = require('child_process');
const { filesExist, dirsExist } = require('./utils/fs-util');
const { add, extract } = require('./utils/7z-util');

const REQ_FILES = ['package.json', 'package-lock.json'];
const NM_DIR = 'node_modules';
const NM_BACKUP = 'node_modules_backup';

const create = async ({ repo, install, delete: deleteAfter, output }) => {
    const dirPath = process.cwd();
    const dirName = path.basename(dirPath);

    //if (repo) {
    //    await git().silent(true).clone(remote);
    //}

    if (!filesExist(...REQ_FILES)) {
        console.error('modules-updater ERR! repo does not have all of the required files:', ...REQ_FILES);
        process.exit(1);
    }

    if (!dirsExist(NM_DIR) ) {
        console.error('modules-updater ERR! repo does not have the required directory:', NM_DIR);
        process.exit(1);
    }

    if (install) {
        execSync('npm install');
    }

    await add(NM_BACKUP, NM_DIR, { recursive: true });

    const outputZipName = `${dirName}_modules_${Date.now()}`;

    await add(outputZipName, [...REQ_FILES, `${NM_BACKUP}.7z`]);
    fs.unlinkSync(`${NM_BACKUP}.7z`);

    //if (deleteAfter) {
    //    fs.rmdirSync(dirPath);
    //}

    if (output) {
        fs.renameSync(`${outputZipName}.7z`, `${output}/${outputZipName}.7z`);
    }
}

const update = () => {
    // If they exist delete: node_modules, NM_BACKUP.7z, package.json, package-lock.json

    // need path to updater zip
    // extract all files from zip
}

module.exports = {
    muCreate: create,
    muUpdate: update
};
