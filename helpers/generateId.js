const crypto = require('crypto');
const fs = require('fs');

module.exports = function generateId(ext) {
    try {
        let id = crypto.randomBytes(3).toString('hex');
        let fileName = `${id}.${ext}`;
        while (fs.existsSync(`./images/${fileName}`)) {
            id = crypto.randomBytes(3).toString('hex');
            fileName = `${id}.${ext}`;
        }
        return id;
    } catch (err) {
        console.error(err);
        return null;
    }
};
