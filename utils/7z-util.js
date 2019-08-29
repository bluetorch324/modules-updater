const { add, extract } = require('node-7z');
const { path7za } = require('7zip-bin');

const resolveOptions = (options = {}) => ({
    ...options,
    $bin: path7za
});

const toPromise = (stream) =>{
    return new Promise((resolve, reject) => {
        stream.on('end', () => resolve());
        stream.on('error', (err) => reject(err));
    });
}

const promiseAdd = (archive, source, options) => {
    return toPromise(
        add(archive, source, resolveOptions(options))
    );
}

const promiseExtract = (archive, output, options) => {
    return toPromise(
        extract(archive, output, resolveOptions(options))
    );
}

module.exports = {
    add: promiseAdd,
    extract: promiseExtract
};