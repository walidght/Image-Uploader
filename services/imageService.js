const JsonManager = require('../helpers/json.helper');
const generateId = require('../helpers/generateId');
const fs = require('fs');
const path = require('path');
const config = require('config');

module.exports = class ImageService {
    static async get() {
        const images = JsonManager.objFromPath('./images.json')?.images;

        return images;
    }
    static async createNew({ path, name }) {
        const basePath = './images';
        const extname = name.split('.')[1];

        const images = JsonManager.objFromPath('./images.json')?.images;

        const newId = generateId(extname);
        if (newId === null) return null;

        const newName = `${newId}.${extname}`;

        images.push(newName);

        const newpath = `${basePath}/${newName}`;

        fs.renameSync(path, newpath);

        JsonManager.objToPath({
            object: { images },
            path: './images.json',
        });

        const baseUrl = config.get('baseUrl');

        return `${baseUrl}/${newName}`;
    }
};
