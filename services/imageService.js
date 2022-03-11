const JsonManager = require('../helpers/json.helper');
const generateId = require('../helpers/generateId');
const fs = require('fs');
const path = require('path');
const config = require('config');

module.exports = class ImageService {
    static async getById(id) {
        const images = JsonManager.objFromPath('./images/images.json');

        if (!images[id]) return null;

        return path.resolve(`./images/${id}.${images[id].type}`);
    }
    static async createNew({ path, name }) {
        const basePath = './images';
        const extname = name.split('.')[1];

        const images = JsonManager.objFromPath('./images/images.json');

        const newName = generateId(images);

        images[newName] = { type: extname };

        const newpath = `${basePath}/${newName}.${extname}`;

        fs.renameSync(path, newpath);

        JsonManager.objToPath({
            object: images,
            path: './images/images.json',
        });

        const baseUrl = config.get('baseUrl');

        return `${baseUrl}/api/images/${newName}`;
    }
};
