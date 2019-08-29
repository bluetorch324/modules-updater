const { unlinkSync } = require('fs');
const { filesExist, dirsExist } = require('../utils/fs-util');
const { extract } = require('../utils/7z-util');

const update = ({modules: path}) => {
    if (filesExist('package.json')) {
        unlinkSync('package.json');
    }

    if (filesExist('package-lock.json')) {
        unlinkSync('package-lock.json');
    }

    if (filesExist('node_modules_backup.7z')) {
        unlinkSync('node_modules_backup.7z');
    }

    if (dirsExist('node_modules')) {
        rmdirSync('node_modules');
    }

    extract(path, './');
}


module.exports = { update };
