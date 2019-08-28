const fs = require('fs');

const fileExists = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                return reject(new Error(err));
            }

            resolve(); // file exists
        })
    });
}

filesExist = (...files) => {
    files.forEach(async (file) => {
        const exists = await fileExists(file);

        if (!exists) return false;
    });

    return true;
}

dirsExist = (...dirs) => {
    dirs.forEach((dir) => {
        const exists = fs.existsSync(dir);

        if (!exists) return false;
    });

    return true;
}

module.exports = {
    filesExist,
    dirsExist
};