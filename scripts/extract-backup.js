const { filesExist } = require('../utils/fs-util');
const { extract } = require('../utils/7z-util');


const extractBackup = () => {
    if (filesExist('node_modules_backup.7z')) {
        extract('node_modules_backup.7z', './');
    }
}


module.exports = { extractBackup };
