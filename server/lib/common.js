const fs = require('fs');
const path = require('path');

/**
 * Obtain the file names of all JS files in a directory.
 * @param {string} directory Directory to get JS files from, should be absolute.
 */
const getJsFiles = directory => new Promise((resolve, reject) => {
  fs.readdir(directory, (err, files) => {
    if (err) return reject(err);
    return resolve(files.filter(file => path.extname(file) === '.js'));
  });
});

module.exports = {
  getJsFiles,
};
