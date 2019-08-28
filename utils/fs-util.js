const fs = require('fs');

const accessFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                return reject(new Error(err));
            }

            resolve(); // file exists
        })
    });
}

const filesExist = async (...files) => {
    try {
        await Promise.all(files.map((file) => accessFile(file)));
        return true;
    } catch (err) {
        return false;
    }
}

const dirsExist = (...dirs) => {
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