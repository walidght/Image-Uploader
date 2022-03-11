const crypto = require('crypto');

module.exports = function generateId(arr) {
    let id = crypto.randomBytes(3).toString('hex');
    while (arr[id]) {
        id = crypto.randomBytes(3).toString('hex');
    }
    return id;
};
