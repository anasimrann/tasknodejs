const fs = require("fs");

const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}

module.exports = { readFileAsync }