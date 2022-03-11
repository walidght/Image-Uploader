const fs = require('fs');

module.exports = class JsonManager {
    static objFromPath(path) {
        try {
            const data = fs.readFileSync(path, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error(err);
        }
        return null;
    }
    static objToPath({ object, path }) {
        try {
            const content = JSON.stringify(object);
            fs.writeFileSync(path, content);
            return true;
        } catch (err) {
            console.error(err);
        }
        return false;
    }
};
