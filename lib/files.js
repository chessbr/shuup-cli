const fs = require("fs");
const path = require("path");

module.exports = {
    getCWD: () => {
        return path.basename(process.cwd());
    },

    dirExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    }
};
