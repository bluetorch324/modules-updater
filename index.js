const { create } = require('./scripts/create');
const { update } = require('./scripts/update');
const { extractBackup } = require('./scripts/extract-backup');

module.exports = {
    muCreate: create,
    muUpdate: update,
    muExtractBackup: extractBackup
};
